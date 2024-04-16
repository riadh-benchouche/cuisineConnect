<script setup>
import {Disclosure, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {UserIcon} from '@heroicons/vue/24/outline'
import {ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon} from "@heroicons/vue/24/outline";
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/vue'
import {reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const token = localStorage.getItem('token')

const userNavigation = [
  {name: 'My favorites', action: () => router.push('/profile')},
  {
    name: 'Sign out', action: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }
]

const state = reactive({
  messages: [
    {content: 'Bonjour, comment puis-je vous aider ?', isBot: true}
  ],
  message: ''
})
const submitMessage = async () => {
  state.message = state.message.trim()
  state.messages.push({content: state.message, isBot: false})
  const url = 'http://localhost:4000/ai/chatBot'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({question: state.message})
  })
      .then(response => response.json())
      .then(data => {
        state.messages.push({content: data.response, isBot: true})
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  state.message = ''
}

</script>
<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <RouterLink to="/" class="flex items-center cursor-pointer">
                <img class="block h-10 w-auto lg:hidden"
                     src="/logo-compact.png" alt="Your Company"/>
                <img class="hidden h-10 w-auto lg:block"
                     src="/logo-compact.png" alt="Your Company"/>
              </RouterLink>
            </div>
          </div>
          <div class="ml-6 flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <RouterLink v-if="!token"
                            to="/login" class="text-sm font-medium text-gray-900 hover:text-gray-900">
                  Sign in
                </RouterLink>
                <MenuButton
                    v-else
                    class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2">
                  <span class="absolute -inset-1.5"/>
                  <span class="sr-only">Open user menu</span>
                  <UserIcon class="h-6 w-6 rounded-full" aria-hidden="true"/>
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <button @click="item.action"
                            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                        item.name
                      }}
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
    <main>
      <div class="mx-auto">
        <slot/>


        <Popover class="relative">
          <PopoverButton
              class="fixed bottom-10 right-10 rounded-full bg-secondary-600 p-2.5 text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
            <ChatBubbleLeftEllipsisIcon class="h-7 w-7" aria-hidden="true"/>
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
                      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
                      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="fixed bottom-24 pb-2 right-10 z-10 flex w-screen max-w-max ">
              <div
                  class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <div class="flex flex-col items-start bg-gray-100 px-4 py-2.5 rounded-3xl">
                    <h3 class="text-lg font-semibold text-gray-900">Discutez avec nous</h3>
                    <p class="text-gray-500">Nous sommes là pour vous aider</p>
                  </div>

                  <div
                      class="h-full overflow-y-auto max-h-[25rem] p-4 space-y-3 border-[1px] my-4 border-gray-200 rounded-3xl">
                    <div v-for="message in state.messages" :key="message.content"
                         class="flex flex-col space-x-3">
                      <div v-if="message.isBot"
                           class="flex items-center space-x-3">
                        <div class="bg-primary-400 p-0.5 rounded-full">
                          <img src="/memoji_cuisto.png" alt="Bot"
                               class="w-10 h-10"/>
                        </div>
                        <div class="bg-gray-100 px-4 py-2.5 rounded-3xl w-full max-w-[300px]">
                          <p class="text-gray-900">{{ message.content }}</p>
                        </div>
                      </div>
                      <div v-else
                           class="flex items-center space-x-3 justify-end">
                        <div class="bg-secondary-600 text-end px-4 py-2.5 rounded-3xl text-white w-fit max-w-[300px]">
                          <p>{{ message.content }}</p>
                        </div>
                        <div class="bg-secondary-400 p-1 rounded-full">
                          <img src="/memoji_user.png" alt="Bot"
                               class="w-10 h-10"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form class="mt-4" @submit.prevent="submitMessage">
                    <div class="flex items-center space-x-3">
                      <input type="text"
                             v-model="state.message"
                             class="flex-1 px-2 py-2 block w-full rounded-full border-gray-200 border-[1px] focus:ring-0 focus:outline-none"
                             placeholder="Type your message"/>
                      <button type="submit"
                              class="rounded-full bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
                        Send
                        <PaperAirplaneIcon
                            class="w-5 h-5 inline-block ml-1"/>
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
    </main>
    <footer class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-6 md:order-2">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true"/>
          </a>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-xs leading-5 text-gray-500">&copy; Cuisine connect, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>