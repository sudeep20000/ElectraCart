const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide question names"],
  },
  optionType: {
    type: String,
    required: [true, "Please provide option type"],
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
  correctAnsInd: {
    type: Number,
    required: [true, "Please provide correct answer index"],
  },
  time: {
    type: Number,
    required: [true, "Please provide timer"],
  },
  attempt: {
    type: Number,
    default: 0,
  },
  correctAttempts: {
    type: Number,
    default: 0,
  },
  worngAttempts: {
    type: Number,
    default: 0,
  },
});

const QNASchema = new mongoose.Schema(
  {
    quizSubject: {
      type: String,
      required: [true, "Please provide quiz topic"],
    },
    quizType: {
      type: String,
      required: [true, "Please provide quiz type"],
    },
    quizQuestions: [QuestionSchema],
    impression: {
      type: Number,
      default: 0,
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide author id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Qna", QNASchema);
