const imageSchema = new mongoose.Schema({
    productName: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
  });
  
  module.exports = mongoose.model("Image", imageSchema);
  