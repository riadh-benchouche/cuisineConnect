<script setup>
import {onMounted, reactive} from 'vue'
import {StarIcon, ClockIcon, CakeIcon} from '@heroicons/vue/20/solid'
import MainLayout from "@/layout/MainLayout.vue";
import {useRouter} from "vue-router";
import Accompaniments from "@/components/Accompaniments.vue";
import Courses from "@/components/Courses.vue";
import {showToast} from "../utils/toast";

const router = useRouter()
const state = reactive({
  error: null,
  isFetching: false,
  isFetchingSimilar: false,
  isFetchingAccompaniments: false,
  isFetchingCourses: false,
  openAccompaniments: false,
  openCourses: false,
  ratingAverage: 0,
  similarRecipes: [],
  accompaniments: [],
  courses: [],
  errorAccompaniments: null,
  errorCourses: null,
  recipe: {
    _id: '',
    name: '',
    ingredients: [],
    description: '',
    duration: 0,
    image: '',
    difficulty: '',
    category: '',
    reviews: [],
    createdAt: '',
    updatedAt: '',
    __v: 0
  },
  newReview: {
    comment: '',
    rating: 0
  }
})

const token = localStorage.getItem('token')

onMounted(async () => {
  const recipeId = router.currentRoute.value.params.id
  const url = `http://localhost:4000/recipe/${recipeId}`
  const urlSimilar = `http://localhost:4000/ai/similarRecipes`
  state.isFetching = true
  await fetch(url)
      .then(response => response.json())
      .then(data => {
        state.recipe = data
        state.ratingAverage = data.reviews.reduce((acc, review) => acc + review.rating, 0) / data.reviews.length
        state.isFetching = false
      })
      .catch(error => {
        state.error = error
        state.isFetching = false
      })
  state.isFetchingSimilar = true
  await fetch(urlSimilar, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({recipeId})
  })
      .then(response => response.json())
      .then(data => {
        state.similarRecipes = data.recipes
        state.isFetchingSimilar = false
      })
      .catch(error => {
        state.error = error
        state.isFetchingSimilar = false
      })
})

const getAccompaniments = async () => {
  const accompaniementUrl = 'http://localhost:4000/ai/accompaniements'
  state.isFetchingAccompaniments = true
  await fetch(accompaniementUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({recipeId: state.recipe._id})
  })
      .then(response => response.json())
      .then(data => {
        state.accompaniments = data
        state.isFetchingAccompaniments = false
        state.openAccompaniments = true
      })
      .catch(error => {
        state.errorAccompaniments = error
        state.isFetchingAccompaniments = false
      })
}

const getCourses = async () => {
  const accompaniementUrl = 'http://localhost:4000/ai/listCourses'
  state.isFetchingCourses = true
  await fetch(accompaniementUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({recipeId: state.recipe._id})
  })
      .then(response => response.json())
      .then(data => {
        state.courses = data
        state.isFetchingCourses = false
        state.openCourses = true
      })
      .catch(error => {
        state.errorCourses = error
        state.isFetchingCourses = false
      })
}

const addFavorites = async () => {
  const url = 'http://localhost:4000/auth/addFavorite'
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({recipeId: state.recipe._id})
  })
      .then(response => response.json())
      .then(data => {
        showToast('Recipe added to favorites', 'success')
      })
      .catch(error => {
        showToast('An error occurred', 'error')
        console.error(error)
      })
}

const submitReview = async () => {
  const url = 'http://localhost:4000/review'
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: JSON.parse(localStorage.getItem('user'))._id,
      recipeId: state.recipe._id,
      comment: state.newReview.comment,
      rating: state.newReview.rating
    })
  })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        state.newReview.comment = '';
        state.newReview.rating = 0;
      })
}
</script>

<template>
  <Accompaniments :on-close="() => state.openAccompaniments = false" :open="state.openAccompaniments"
                  :recipeName="state.recipe.name" :accompaniments="state.accompaniments"/>

  <Courses :on-close="() => state.openCourses = false" :open="state.openCourses"
           :recipeName="state.recipe.name" :courses="state.courses"/>
  <MainLayout>
    <div v-if="state.isFetching" class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
      <div class="loader"/>
    </div>
    <div v-else
         class="mx-auto mt-20 px-4 pb-16 sm:px-6 sm:pb-24 max-w-7xl lg:px-8">
      <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">

        <div class="lg:col-span-5 lg:col-start-8">

          <div class="flex justify-between">
            <div class="flex items-center justify-between space-x-2">
              <h1 class="text-xl font-medium text-gray-900">{{ state.recipe.name }}</h1>

              <button v-if="token" type="button" @click="addFavorites"
                      class="flex items-center justify-center rounded-full border border-transparent bg-yellow-400 p-1 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2">
                <StarIcon class="h-4 w-4 flex-shrink-0 text-white-400" aria-hidden="true"/>
              </button>

            </div>

            <span
                class="inline-flex items-center rounded-full bg-secondary-50 px-2 py-1 text-xs font-medium text-secondary-600 ring-1 ring-inset ring-secondary-500/10">
              {{ state.recipe.category.name }}

            </span>


          </div>
          <!-- Reviews -->
          <div class="mt-4">
            <h2 class="sr-only">Reviews</h2>
            <div class="flex items-center">

              <p class="text-sm text-gray-700">
                {{ state.recipe.reviews.length }} reviews
                <span class="sr-only"> out of 5 stars</span>
              </p>

              <div class="ml-1 flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                          :class="[state.ratingAverage > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                          aria-hidden="true"/>
              </div>

            </div>
          </div>

        </div>

        <!-- Image gallery -->
        <div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <h2 class="sr-only">Images</h2>
          <div class="grid grid-cols-1 lg:grid-rows-3">
            <img :src="state.recipe.image" :alt="state.recipe.name"
                 loading="eager"
                 class="rounded-lg h-full w-full object-center object-cover lg:row-span-3 lg:col-span-1"/>
          </div>
        </div>

        <div class="mt-8 lg:col-span-5">
          <div class="flex flex-1 justify-center items-center space-x-2">
            <button type="button" @click="getAccompaniments"
                    class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-secondary-600 px-8 py-3 text-base font-medium text-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2">
              {{
                state.errorAccompaniments ? 'Error' : state.isFetchingAccompaniments ? 'Loading...' : 'Get accompaniments'
              }}
            </button>

            <button type="button" @click="getCourses"
                    class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2">
              {{
                state.errorCourses ? 'Error' : state.isFetchingCourses ? 'Loading...' : 'Get courses'
              }}
            </button>
          </div>

          <!-- Product details -->
          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Description</h2>
            <div class="prose prose-sm mt-4 text-gray-500" v-html="state.recipe.description"/>
          </div>
          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text-sm font-medium text-gray-900">Ingredients</h2>
            <div class="prose prose-sm mt-4 text-gray-500">
              <ul role="list">
                <li v-for="ingredient in state.recipe.ingredients" :key="ingredient._id">
                  {{ ingredient.name }} - {{ ingredient.quantity }}
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text-sm font-medium text-gray-900">Steps</h2>
            <div class="prose prose-sm mt-4 text-gray-500 ml-5">
              <ul role="list">
                <li v-for="(step, index) in state.recipe.steps" :key="index" class="mb-2 list-decimal">
                  {{ step }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Policies -->
          <section aria-labelledby="policies-heading" class="mt-10">
            <h2 id="policies-heading" class="sr-only">More information</h2>
            <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                <dt>
                  <ClockIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                  <span class="mt-4 text-sm font-medium text-gray-900">{{ state.recipe.duration }}</span>
                </dt>
              </div>
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                <dt>
                  <CakeIcon class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                  <span class="mt-4 text-sm font-medium text-gray-900">{{ state.recipe.difficulty }}</span>
                </dt>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <section v-if="token"
               class="mt-16 sm:mt-24">
        <h2 class="text-lg font-medium text-gray-900">Add a review</h2>
        <form @submit.prevent="submitReview" class="mt-4 space-y-4">
          <div>
            <label for="comment" class="block text-sm font-medium text-gray-700">Comment</label>
            <textarea id="comment" v-model="state.newReview.comment" name="comment" rows="3"
                      class="mt-1 block w-full border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
            <select id="rating" v-model="state.newReview.rating" name="rating"
                    class="mt-1 block my-2 w-full border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
              <option value="1" class="py-2">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
          <button type="submit"
                  class="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Add Review
          </button>
        </form>
      </section>


      <!-- Reviews -->
      <section aria-labelledby="reviews-heading" class="mt-16 sm:mt-24" v-if="state.recipe.reviews.length > 0">
        <h2 id="reviews-heading" class="text-lg font-medium text-gray-900">Recent reviews</h2>

        <div class="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
          <div v-for="review in state.recipe.reviews" :key="review._id"
               class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div
                class="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
              <div class="flex items-center xl:col-span-1">
                <div class="flex items-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                            :class="[review.rating > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                            aria-hidden="true"/>
                </div>
                <p class="ml-3 text-sm text-gray-700">{{ review.rating }}<span class="sr-only"> out of 5 stars</span>
                </p>
              </div>

              <div class="mt-2 xl:col-span-2 xl:mt-0">
                <div class="text-sm text-gray-500" v-html="review.comment"/>
              </div>
            </div>

            <div
                class="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
              <p class="font-medium text-gray-900">{{ review.user.name }}</p>
              <time :datetime="() => new Date(review.createdAt).toISOString()"
                    class="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
                {{ new Date(review.createdAt).toLocaleDateString() }}
              </time>
            </div>
          </div>
        </div>
      </section>

      <!-- Related products -->
      <section aria-labelledby="related-heading" class="mt-16 sm:mt-24">
        <h2 id="related-heading" class="text-lg font-medium text-gray-900">Similar recipes</h2>
        <div v-if="state.isFetchingSimilar"
             class="inset-0 flex items-center justify-center mt-10">
          <svg class="animate-spin h-10 w-10 text-secondary-600" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V2.5"/>
          </svg>
        </div>
        <div v-else class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div v-for="similarRecipe in state.similarRecipes" :key="similarRecipe._id"
               class="group relative">
            <div
                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img :src="similarRecipe.image" :alt="similarRecipe.name"
                   class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <RouterLink to="/recipe/:id" class="font-semibold text-gray-900 group-hover:underline">
                    <span aria-hidden="true" class="absolute inset-0"/>
                    {{ similarRecipe.name }}
                  </RouterLink>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ similarRecipe.difficulty }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ similarRecipe.duration }} min</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MainLayout>
</template>