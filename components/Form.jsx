import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col gap-7 glassmorphism"
      >
        <label className="w-2/4">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Date
          </span>
          <input
            type="date"
            value={type === "Create" ? post.date : post.date.slice(0, 10)}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Memory
          </span>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            placeholder="Enter memory here"
            className="form_textarea"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-gray-500 text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            onClick={handleSubmit}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {type === "Create"
              ? submitting
                ? "Creating"
                : "Create"
              : submitting
              ? "Updating"
              : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
