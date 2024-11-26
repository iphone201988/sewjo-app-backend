import mongoose from "mongoose";

const fabricSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
      //   required: true,
    },
    material: {
      type: String,
      default: "",
      //   required: true,
    },
    width: {
      type: Number,
      default: 0,
      //   required: true,
    },
    widthType: {
      type: String,
      default: "",
      //   required: true,
    },
    weight: {
      type: Number,
      default: 0,
      //   required: true,
    },
    weightType: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
      //   required: true,
    },
    price: {
      type: Number,
      default: 0,
      //   required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
      //   required: true,
    },
    userRef: {
      type: String,
    },
    length: {
      type: Number,
      default: "",
      //   require: true,
    },
    lenghtType: {
      type: String,
      default: "",
      //   require: true,
    },
    quantity: {
      type: Number,
      default: 0,
      //   require: true,
    },
    weave: {
      type: String,
      default: "",
      //   require: true,
    },
    usageIntent: {
      type: [String],
      default: [],
      //   require: true,
    },
    fabricName: {
      type: [String],
      default: [],
      //   require: true,
    },
    Pattern: {
      type: [String],
      default: [],
      //   require: true,
    },
    stretchtype: {
      type: String,
      default: "",
      //   require: true,
    },
    stretchWidth: {
      type: Number,
      default: 0,
      // require: true,
    },
    stretchLength: {
      type: Number,
      default: 0,
      // require:true
    },

    lengthValue: {
      type: String,
      default: "",
      // require:true
    },
    widthValue: {
      type: String,
      default: "",
      // require:true
    },

    shrinkage: {
      type: String,
      default: "",
      // require:true
    },
    drape: {
      type: Number,
      default: 0,
      // require:true
    },
    imperfection: {
      type: String,
      default: "",
      // require:true
    },
    shope: {
      type: String,
      default: "",
      // require:true
    },
    currencyType: {
      type: String,
      default: "",
      // require:true
    },
    currency: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: "",
      // require:true
    },
    note: {
      type: String,
      default: "",
      // require:true
    },
    tags: {
      type: [String],
      default: [],
      // require:true
    },
    fabricContent: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Fabric = mongoose.model("Fabric", fabricSchema);

export default Fabric;
