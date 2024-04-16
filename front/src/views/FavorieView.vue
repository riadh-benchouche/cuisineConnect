<script setup>
import {CheckIcon, ClockIcon} from '@heroicons/vue/20/solid'
import MainLayout from "@/layout/MainLayout.vue";
import {onMounted, reactive} from "vue";

const state = reactive({
  recipes: [{
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
  }
  ]
})

onMounted(async () => {
  const url = 'http://localhost:4000/auth/getFavorites';
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  state.recipes = data.recipes;
})
</script>
<template>
  <MainLayout >
    <div v-if="state.recipes.length > 0" class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
      <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Favorites Recipes</h1>

      <form class="mt-12">
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" class="sr-only">Recipes</h2>

          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li v-for="recipe in state.recipes" :key="recipe._id" class="flex py-6">
              <div class="flex-shrink-0">
                <img :src="recipe.image" :alt="recipe.name"
                     class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"/>
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <a :href="/recipe/+recipe._id" class="font-medium text-gray-700 hover:text-gray-800">{{
                          recipe.name
                        }}</a>
                    </h4>
                    <p class="ml-4 text-sm font-medium text-gray-900">{{ recipe.duration }}</p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">{{ recipe.category.name }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ recipe.difficulty }}</p>
                </div>

                <div class="mt-4 flex flex-1 items-end justify-between">
                  <div>
                    <button type="button" class="text-sm font-medium text-secondary-600 hover:text-secondary-500">
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </form>
    </div>
  </MainLayout>
</template>

