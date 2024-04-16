<script setup lang="ts">
import {reactive} from 'vue';
import {useRouter} from "vue-router";

const state = reactive({
  email: '',
  password: '',
});

const router = useRouter();
const submit = () => {

  fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: state.email,
      password: state.password,
    }),
  })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};

</script>
<template>
  <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <img class="mx-auto h-20   w-auto" src="/logo-cuisine-connect.png" alt="Your Company"/>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your
          account</h2>
      </div>
      <form class="space-y-6" action="#" method="POST" @submit.prevent="submit">
        <div class="relative -space-y-px rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"/>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="state.email" id="email-address" name="email" type="email" autocomplete="email"
                   :required="true"
                   class="px-2 relative block w-full rounded-t-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:outline-none focus:ring-secondary-600"
                   placeholder="Email address"/>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="state.password" id="password" name="password" type="password"
                   autocomplete="current-password" :required="true"
                   class="px-2 relative block w-full rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-secondary-600 sm:text-sm sm:leading-6 focus:outline-none"
                   placeholder="Password"/>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-600"/>
            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
          </div>

          <div class="text-sm leading-6">
            <a href="#" class="font-semibold text-secondary-600 hover:text-secondary-500">Forgot password?</a>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="flex w-full justify-center rounded-md bg-secondary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
            Sign in
          </button>
        </div>
      </form>

      <p class="text-center text-sm leading-6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="/register" class="font-semibold text-secondary-600 hover:text-secondary-500">Sign up now</a>
      </p>
    </div>
  </div>
</template>
