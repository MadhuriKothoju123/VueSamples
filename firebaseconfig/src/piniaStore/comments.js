import { defineStore } from 'pinia';
import { ref } from 'vue';
import { database } from '../firebase';
import {
  ref as dbRef,
  push,
  set,
  onValue,
  query,
  orderByChild,
  equalTo,
  startAt,
  endAt,
  limitToFirst,
} from 'firebase/database';

export const useCommentStore = defineStore('comment', () => {
  const comments = ref([]);
  const commentId = ref(0);

  const getStartOfDayTimestamp = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of day
    return now.getTime();
  };

  const getEndOfDayTimestamp = () => {
    const now = new Date();
    now.setHours(23, 59, 59, 999); // Set to end of day
    return now.getTime();
  };

  const getComments = (userId) => {
    const startOfDayTimestamp = getStartOfDayTimestamp();
    const endOfDayTimestamp = getEndOfDayTimestamp();
    const commentsQuery = query(
      dbRef(database, 'comments'),
      orderByChild('timestamp'),
      startAt(startOfDayTimestamp),
      endAt(endOfDayTimestamp),
      limitToFirst(2)
    );

    onValue(commentsQuery, (snapshot) => {
      const commentsData = snapshot.val();
      const filteredComments = [];

      if (commentsData) {
        for (const commentId in commentsData) {
          const comment = commentsData[commentId];
          if (comment.userId === userId) {
            filteredComments.push({ id: commentId, ...comment });
          }
        }
      }

      comments.value = filteredComments;
      console.log(comments.value);
    });
  };

  const addComment = async (userId, postId, comment) => {
    const newCommentRef = push(dbRef(database, 'comments'));
    await set(newCommentRef, { userId, postId, comment, timestamp: Date.now() });
  };

  return { addComment, getComments, commentId, comments };
}, {
  persist: {
    storage: localStorage,
  },
});
