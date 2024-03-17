const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide question names"],
  },
  optionType: {
    type: String,
    required: [true, "Please provide question type"],
  },
  options: [
    {
      type: String,
    },
  ],
  imgURL: [
    {
      type: String,
    },
  ],
  optionCount: [
    {
      type: Number,
    },
  ],
});

const PollSchema = new mongoose.Schema(
  {
    quizSubject: {
      type: String,
      require: [true, "Please provide quiz subject"],
    },
    quizType: {
      type: String,
      require: [true, "Please provide quiz type"],
    },
    quizQuestions: [QuestionSchema],
    impression: {
      type: Number,
      default: 0,
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide author id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", PollSchema);
