import { fauna } from "../../../service/faunadb";
import { stripe } from "../../../service/stripe";

import { query as q } from "faunadb";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  console.log("entrei no saveSubscription: ", subscriptionId, customerId);

  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  try {
    if (createAction) {
      await fauna.query(
        q.Create(q.Collection("subscriptions"), {
          data: subscriptionData,
        })
      );
    } else {
      await fauna.query(
        q.Replace(
          q.Select(
            "ref",
            q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
          ),
          { data: subscriptionData }
        )
      );
    }
  } catch (e) {
    console.log(e);
  }
}
