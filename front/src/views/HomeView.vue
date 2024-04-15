<script setup lang="ts">
import {ChevronRightIcon} from '@heroicons/vue/20/solid'
import {onMounted, reactive} from "vue";
import {stringify} from '@vueuse/docs-utils'
import {useFetch} from '@vueuse/core'
import MainLayout from "@/layout/MainLayout.vue";

type Recipe = {
  _id: string
  name: string
  ingredients: string[]
  description: string
  duration: number
  image: string
  difficulty: string
  category: string
  reviews: string[]
  createdAt: string
  updatedAt: string
  __v: number
}
const state = reactive({
  error: null,
  isFetching: false,
  recipes: [] as Recipe[],
  search: ''
})

const searchRecipe = () => {
  console.log('searchRecipe')
}


onMounted(async () => {
  const url = 'http://localhost:4000/recipe'
  state.isFetching = true
  const {data, isFetching, error} = await useFetch(url)
  state.isFetching = isFetching.value
  if (error.value) {
    console.log('error')
    state.error = error.value
    console.error(error.value)
  } else {
    if (data.value)
      state.recipes = JSON.parse(data.value)
  }
})
</script>

<template>
  <MainLayout>
    <div class="relative isolate overflow-hidden bg-white">
      <svg
          class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true">
        <defs>
          <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1"
                   patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"/>
      </svg>
      <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8 pt-40 pb-10">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <img class="w-24" src="/logo-cuisine-connect.png"
               alt="Your Company"/>
          <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Cook with confidence</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">Cuisine Connect is the all-in-one platform for home cooks.
            Discover new recipes, plan your meals, and shop for ingredients all in one place.</p>
          <div class="flex flex-col mt-10 items-start gap-x-6 absolute z-20 space-y-10">
            <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div
                  class="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Find your Recipe</label>
                <div class="mt-2">
                  <input v-model="state.search" type="search" name="email" id="email"
                         class="block w-[40rem] rounded-md border-0 pl-2 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                         placeholder="Gaspacho"/>
                </div>
              </div>
            </div>
            <button @click="searchRecipe"
                    class="rounded-md bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
              Search
              <ChevronRightIcon
                  class="w-5 h-5 inline-block ml-1"/>
            </button>
          </div>
        </div>
        <div
            class="z-10 mx-auto flex max-w-2xl lg:ml-10 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <img src="/salade.png" alt="App screenshot"
               width="1200" height="1200" class="w-[65rem] mt-56 lg:-mt-24"/>
        </div>
      </div>
    </div>
    <div class="bg-white pb-24 sm:pb-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Best Recipes</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Discover the best recipes from our community of home cooks.
            From quick and easy weeknight meals to show-stopping dishes for special occasions, we have something for
            everyone.</p>
        </div>
        <div
            class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="recipe in state.recipes" :key="recipe._id"
                   class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
            <img :src="recipe.image" :alt="recipe.name" class="absolute inset-0 -z-10 h-full w-full object-cover"/>
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900/70 via-gray-900/20"/>
            <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
            <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <div class="-ml-4 flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                  <circle cx="1" cy="1" r="1"/>
                </svg>
                <div class="flex gap-x-2.5">
                  {{ recipe.difficulty }}
                </div>
              </div>
            </div>
            <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
              <a :href="'/recipe/' + recipe._id" class="relative z-10">
                <span class="absolute inset-0"/>
                {{ recipe.name }}
              </a>
            </h3>
          </article>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
