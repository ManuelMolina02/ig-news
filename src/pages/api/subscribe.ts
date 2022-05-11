import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../service/stripe";
import { getSession } from "next-auth/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const stripeCostumer = await stripe.customers.create({
      email: session.user.email,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCostumer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1KLp5jDOPilXXajRqYY5HOX0", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: `${process.env.STRIPE_SUCCESS_URL}`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
    });

    return res.status(200).json({ sessionId: checkoutSession.id });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
};
