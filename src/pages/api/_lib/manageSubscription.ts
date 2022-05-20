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
  console.log("buscando ref de usuario: ", userRef);

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  console.log("createAction: ", createAction);

  if (createAction) {
    //console.log("entrei no create com o data: ", subscriptionData);
    //console.log("subscriptionId no create: ", subscriptionId);
    await fauna.query(
      q.Create(q.Collection("subscriptions"), {
        data: subscriptionData,
      })
    );
  } else {
    //console.log("entrei no update com o data: ", subscriptionData);
    //console.log("subscriptionId no update: ", subscriptionId);

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
}
