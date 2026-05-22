<template>
    <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    >
        <template #right>
            <van-popover v-if="useRoute().name?.toString() === 'ViewProduct'" v-model:show="showPopover" :actions="actions" @select="onSelect" placement="bottom-end">
                <template #reference>
                    <van-button icon="ellipsis"/>
                </template>
            </van-popover>
        </template>
    </van-nav-bar>

    <delete-popup
        v-model:show="isShowDeleteConfirmPopup"
        @cancel="isShowDeleteConfirmPopup = false"
        @delete="confirmDelete"
        message="Are you sure you want to delete this product?"
    />
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import DeletePopup from '@/components/DeletePopup.vue';
const router = useRouter();

const onClickLeft = () => {
    router.back()
    console.log('Left button clicked');
};

const onClickRight = () => {
    console.log('Right button clicked');
}

const actions: Array<{ text: string }> = [ 
    { text: 'Edit' },
    { text: 'Delete' },
]

const showPopover = ref(false);

const onSelect = (action: { text: string }) => {
    console.log('text', action)
    switch (action.text) {
        case 'Delete':
            isShowDeleteConfirmPopup.value = true
            console.log('delete', isShowDeleteConfirmPopup.value)
            break;
    }
}

const isShowDeleteConfirmPopup = ref<boolean>(false);

const confirmDelete = () => {
    isShowDeleteConfirmPopup.value = false;
    console.log(`Confirmed deletion of product ?`);
}
</script>

<style lang="scss" scoped>
</style>