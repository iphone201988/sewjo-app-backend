import mongoose from "mongoose";

const formOrderSchema = new mongoose.Schema({
  form_id: { type: String },
  form_order: {
    type: Array,
  },
});

const FormOrder = mongoose.model("formorder", formOrderSchema);

export default FormOrder;
