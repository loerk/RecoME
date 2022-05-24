import React from "react";

export default function Gallery({ input }) {
  console.log("input", input);
  return (
    <section class="overflow-hidden text-gray-700">
      <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
        <div class="flex flex-wrap -m-1 md:-m-2">
          <div class="flex flex-wrap w-1/2">
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block object-cover object-center w-full h-full rounded-lg"
                src={input.imageUrl}
              />
            </div>
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block object-cover object-center w-full h-full rounded-lg"
                src={input.imageUrl}
              />
            </div>
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block object-cover object-center w-full h-full rounded-lg"
                src={input.imageUrl}
              />
            </div>
          </div>
          <div class="flex flex-wrap w-1/2">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block object-cover object-center w-full h-full rounded-lg"
                src={input.imageUrl}
              />
            </div>
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block object-cover object-center w-full h-full rounded-lg"
                src={input.imageUrl}
              />
            </div>
            <div class="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                class="block object-cover object-center w-full h-full rounded-lg"
                src={input.imageUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
