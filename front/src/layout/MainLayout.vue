<script setup>
import {Disclosure, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {UserIcon} from '@heroicons/vue/24/outline'

const userNavigation = [
  {name: 'My favorites', href: '#'},
  {name: 'Sign out', href: '#'},
]
</script>
<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img class="block h-10 w-auto lg:hidden"
                   src="/logo-compact.png" alt="Your Company"/>
              <img class="hidden h-10 w-auto lg:block"
                   src="/logo-compact.png" alt="Your Company"/>
            </div>
          </div>
          <div class="ml-6 flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
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
                    <a :href="item.href"
                       :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                        item.name
                      }}</a>
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