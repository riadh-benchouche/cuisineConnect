<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {CakeIcon} from '@heroicons/vue/24/outline'

const props = defineProps({
  recipeName: {
    type: String,
    required: true
  },
  accompaniments: {
    type: Array,
    required: true
  },
  open: {
    type: Boolean,
    required: true
  },
  onClose: {
    type: Function,
    required: true
  },
})

</script>

<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-10" @close="props.onClose">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
                  <CakeIcon class="h-6 w-6 text-secondary-600" aria-hidden="true"/>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Accompaniments for your
                    recipe {{ props.recipeName }}
                  </DialogTitle>
                  <div class="mt-4 ml-5">
                    <div class="prose prose-sm mt-4 text-gray-500 text-start">
                      <ul role="list">
                        <li v-for="(accompaniment, index) in props.accompaniments" :key="index" class="mb-2 list-disc">
                          {{ accompaniment }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
                        @click="props.onClose">
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>