import Stripe from 'stripe';

export class StripeModel {
    static stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2025-02-24.acacia',
    });

    static async createCustomer({ email, userId }: { email: string; userId: string }): Promise<string> {
        try {
            const customer = await this.stripe.customers.create({
                email,
                metadata: {
                    userId,
                },
            });
            return customer.id;
        } catch (error) {
            console.log(error);
            throw new Error('Error creating customer');
        }
    }

    static async getCustomerIdByEmail(email: string): Promise<string> {
        try {
            const customer = await this.stripe.customers.list({ email });
            return customer.data[0].id;
        } catch (error) {
            console.log(error);
            throw new Error('Error getting customer id');
        }
    }
}
