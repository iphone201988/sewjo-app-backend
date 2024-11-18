import mongoose from "mongoose";

const supplySchema = new mongoose.Schema({
    name: { type: String, required: false, default: "" },
    imageUrls: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    unitsOfMeasure: { type: [String], default: [] },
    color: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    brands: { type: [String], default: [] },
    price: { type: String, default: "" },
    currency: { type: String, default: "CAD" },
    tags: { type: [String], default: [] },
    notes: { type: String, default: "" },
    userRef: { type: String},
},{
    timestamps: true
});

const Supply = mongoose.model('Supply', supplySchema);
export default Supply;
