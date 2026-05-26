import {z} from "zod";

export const AddMoneySchema = z
  .string()
  .regex(
    /^(?!0\d)\d{1,10}(\.\d{1,2})?$/,
    "Invalid amount"
  );