<script setup>
import axios from "axios";
import Avatar from "./Avatar.vue";
import PostOption from "./PostOption.vue";
import { useUserStore } from "../stores/user";
import CommentItem from "./CommentItem.vue";
const userStore = useUserStore();
import { ref, onMounted } from "vue";
const props = defineProps({
  post: Object,
});

const like = ref(false);
const isShow = ref(false);
const commentValue = ref("");
const toggleOption = () => {
  isShow.value = !isShow.value;
};

const commentInput = ref(false);

const showCommentInput = () => {
  commentInput.value = !commentInput.value;
};

const getCreatedTime = (createdTime) => {
  let time = new Date().getTime() - new Date(createdTime).getTime();
  if (time < 60 * 1000) {
    return "Vừa xong";
  } else if (time >= 60 * 1000 && time < 60 * 60 * 1000) {
    return `${Math.round(time / 1000 / 60)} phút`;
  } else if (time >= 60 * 60 * 1000 && time < 24 * 60 * 60 * 1000) {
    return `${Math.round(time / 1000 / 60 / 60)} giờ`;
  } else if (time >= 24 * 60 * 60 * 1000 && time < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.round(time / 1000 / 60 / 60 / 24)} ngày`;
  } else if (time >= 7 * 24 * 60 * 60 * 1000) {
    let date = new Date(createdTime);
    return `${date.getDate()} thg ${date.getMonth() + 1}`;
  }
};

const verifyLike = () => {
  if (props.post.likes.some((e) => e._id === userStore.user._id)) {
    like.value = true;
  } else {
    like.value = false;
  }
};

verifyLike();
// onMounted(() => {
// });

const handleLike = () => {
  if (!like.value) {
    axios
      .post("http://localhost:3000/api/post/like", {
        postId: props.post._id,
        userId: userStore.user._id,
      })
      .then((res) => {
        like.value = true;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .post("http://localhost:3000/api/post/unlike", {
        postId: props.post._id,
        userId: userStore.user._id,
      })
      .then((res) => {
        like.value = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const sendComment = () => {
  axios
    .post("http://localhost:3000/api/post/comment", {
      postId: props.post._id,
      userId: userStore.user._id,
      content: commentValue.value,
    })
    .then((res) => {
      console.log(res.data);
      commentValue.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <PostOption :post="post" @toggle-option="toggleOption" v-if="isShow" />
  <div class="rounded-xl my-4 bg-white border shadow-sm">
    <div class="p-2 flex justify-between">
      <div class="flex items-center">
        <Avatar
          :src="post.author.avatar_url"
          :alt="post.author.name"
          class="mr-3"
        />

        <div class="flex flex-col justify-center">
          <!-- <Link
              to={`/u/${post.Author.username}`}
              class="font-medium leading-1"
            >{`${post.Author.name}`}</Link> -->
          <div class="font-medium leading-1">{{ post.author.name }}</div>
          <span class="text-xs leading-none">
            {{ getCreatedTime(post.createdAt || "0") }}
          </span>
        </div>
      </div>
      <div class="relative">
        <button
          @click="toggleOption"
          class="hover:bg-whitesmoke h-8 w-8 flex justify-center items-center rounded-full"
        >
          <i class="ri-more-line ri-xl"></i>
        </button>
        <!-- {dropdown ? <PostOption post={post} /> : <></>} -->
      </div>
    </div>
    <div class="px-2 mb-2">{{ post.content }}</div>
    <div>
      <div class="relative px-2">
        <img
          v-if="post.image_url"
          :src="'http://localhost:3000/upload/' + post.image_url"
          width="500"
          height="500"
          class="object-cover rounded-xl"
          :alt="post.content"
        />
      </div>
    </div>
    <div v-if="post.likes.length" class="px-4 py-2 text-xs">
      {{ post.likes.length }} lượt thích
    </div>
    <hr class="mx-4" />
    <div class="grid grid-cols-3 p-1">
      <button
        @click="handleLike"
        class="col-span-1 flex justify-center items-center"
      >
        <i
          :class="[
            'ri-xl mr-2',
            like ? 'text-red-500 ri-heart-fill' : 'ri-heart-line',
          ]"
        ></i>
        <span :class="['font-medium', like ? 'text-red-500' : '']">Thích</span>
      </button>
      <!-- <LikePost like={like} post={post} setLike={setLike} /> -->

      <div
        @click="showCommentInput"
        class="col-span-1 flex cursor-pointer items-center justify-center"
      >
        <i class="ri-chat-1-line ri-xl"></i>
        <span class="font-medium ml-2">Bình luận</span>
      </div>
      <div class="col-span-1 flex items-center justify-center">
        <i class="ri-share-forward-line ri-xl"></i>
        <span class="font-medium ml-2">Chia sẻ</span>
      </div>
    </div>
    <!-- {post.ListComment && post.ListComment.length > 0 ? (
        <hr class="mx-4" />
      ) : (
        <></>
      )}
      <div
        class={clsx(
          post.ListComment && post.ListComment.length > 0 ? "py-2" : ""
        )}
      >
        {post && post.post_id ? (
          <CommentManager postId={post.post_id} cmtList={post.ListComment} />
        ) : (
          <></>
        )}
      </div>
      {post.post_id && toggleComment ? (
        <InputComment post_id={post.post_id} />
      ) : (
        <></>
      )} -->

    <CommentItem
      v-if="post.comments.length"
      v-for="comment in post.comments"
      :comment="comment"
      :key="comment._id"
    />

    <div className="mx-2 pb-2">
      <input
        v-if="commentInput"
        @keyup.enter="sendComment"
        @input="(event) => (commentValue = event.target.value)"
        className="w-full rounded-full p-3 h-9 bg-gray-100
      placeholder:text-black/80 focus:outline-none"
        type="text"
        :value="commentValue"
        placeholder="Viết bình luận"
      />
    </div>
  </div>
</template>
