import mongoose from "mongoose";

const fabricSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
    },
    description: {
      type: String,
      //   required: true,
    },
    material: {
      type: String,
      //   required: true,
    },
    width: {
      type: Number,
      //   required: true,
    },
    widthType: {
      type: String,
      //   required: true,
    },
    weight: {
      type: Number,
      //   required: true,
    },
    weightType: {
      type: String,
    },
    colour: {
      type: String,
      //   required: true,
    },
    price: {
      type: Number,
      //   required: true,
    },
    imageUrls: {
      type: Array,
      //   required: true,
    },
    userRef: {
      type: String,
      //   required: true,
    },
    length: {
      type: Number,
      //   require: true,
    },
    lenghtType: {
      type: String,
      //   require: true,
    },
    quantity: {
      type: Number,
      //   require: true,
    },
    weave: {
      type: String,
      //   require: true,
    },
    usageIntent: {
      type: Array,
      //   require: true,
    },
    fabricName: {
      type: Array,
      //   require: true,
    },
    Pattern: {
      type: Array,
      //   require: true,
    },
    stretchtype: {
      type: String,
      //   require: true,
    },
    stretchWidth: {
      type: Number,
      // require: true,
    },
    stretchLength: {
      type: Number,
      // require:true
    },

    shrinkage: {
      type: String,
      // require:true
    },
    Drape: {
      type: String,
      // require:true
    },
    imperfection: {
      type: String,
      // require:true
    },
    shop: {
      type: String,
      // require:true
    },
    currencyType: {
      type: String,
      // require:true
    },
    currency: {
      type: Number,
    },
    location: {
      type: String,
      // require:true
    },
    note: {
      type: String,
      // require:true
    },
    tags: {
      type: Array,
      // require:true
    },
    fabricContent: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Fabric = mongoose.model("Fabric", fabricSchema);

export default Fabric;
