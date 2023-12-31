import { Component, OnInit } from '@angular/core';
import { FetchCommentsService } from '../fetch-comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css', './comments-cont.component.css'],
})
export class CommentsComponent implements OnInit {
  data: any;

  commentInputValue: string = '';

  increment(comment: any) {
    comment.score++;
  }

  decrement(comment: any) {
    comment.score--;
  }

  onInput(value: string) {
    this.commentInputValue = value;
  }

  addComment(inputValue: string) {
    if (!inputValue) {
      return;
    }
    const newComment = {
      id: Date.now(),
      content: inputValue,
      createdAt: '1 second ago',
      score: 0,
      user: {
        image: {
          png: this.data.currentUser.image.png,
        },
        username: this.data.currentUser.username,
      },
      replies: [],
    };
    this.data.comments.push(newComment);
    this.commentInputValue = '';
  }

  addReply(comment: any, username: string, inputValue: string, reply?: any) {
    if (!inputValue) {
      return;
    }
    const newComment = {
      id: Date.now(),
      content: inputValue,
      createdAt: '1 second ago',
      score: 0,
      replyingTo: username,
      user: {
        image: this.data.currentUser.image,
        username: this.data.currentUser.username,
      },
    };
    comment.replies.push(newComment);
    if (reply) {
      this.toggleReplyInput(reply);
    } else {
      this.toggleReplyInput(comment);
    }
  }

  deleteComment(commentId: number) {
    const index = this.data.comments.findIndex(
      (comment: any) => comment.id === commentId
    );
    this.data.comments.splice(index, 1);
    console.log(index);
  }

  deleteReply(comment: any, commentId: number) {
    const index = comment.replies.findIndex(
      (reply: any) => reply.id === commentId
    );
    comment.replies.splice(index, 1);
    console.log(index);
  }

  editComment(comment: any, inputValue: string) {
    if (!inputValue) {
      return;
    }
    comment.content = inputValue;
    console.log(inputValue);
    this.toggleUpdateInput(comment);
  }

  toggleReplyInput(comment: any) {
    comment.showReplyInput = !comment.showReplyInput;
  }

  toggleUpdateInput(comment: any) {
    comment.showUpdateInput = !comment.showUpdateInput;
  }

  toggleDeleteModal(comment: any) {
    console.log(comment);
    comment.showDeleteModal = !comment.showDeleteModal;
  }

  constructor(private fetchCommentsService: FetchCommentsService) {}

  ngOnInit(): void {
    this.fetchCommentsService.getData().subscribe((result) => {
      this.data = result;
    });
  }
}
