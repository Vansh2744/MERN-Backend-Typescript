import mongoose, { Document, Schema, Types } from "mongoose";

interface ISubscription extends Document {
  name: string;
  price: number;
  currency: string;
  frequency: string;
  category: string;
  paymentMethod: string;
  status: string;
  startDate: Date;
  renewalDate?: Date;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema: Schema<ISubscription> =
  new mongoose.Schema<ISubscription>(
    {
      name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100,
      },
      price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than 0"],
      },
      currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD",
      },
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
      },
      category: {
        type: String,
        enum: [
          "sports",
          "news",
          "entertainment",
          "lifestyle",
          "technology",
          "finance",
          "politics",
          "other",
        ],
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
      },
      startDate: {
        type: Date,
        required: true,
        validate: {
          validator: (value: Date) => value <= new Date(),
          message: "Start date must be in the past",
        },
      },
      renewalDate: {
        type: Date,
        validate: {
          validator: function (this: ISubscription, value: Date) {
            if (!value) return true;
            return value > this.startDate;
          },
          message: "Renewal date must be after the start date",
        },
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
    },
    { timestamps: true },
  );

export const Subscription =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", subscriptionSchema);
