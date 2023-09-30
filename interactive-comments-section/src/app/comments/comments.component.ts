import { Component, OnInit } from '@angular/core';
import { FetchCommentsService } from '../fetch-comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  data: any;

  logData() {
    console.log(this.data);
  }

  increment(comment: any) {
    comment.score++;
  }

  decrement(comment: any) {
    comment.score--;
  }

  addReply(comment: any, username: string) {
    const newComment = {
      id: 100,
      content: `@${username}`,
      createdAt: '1 second ago',
      score: 0,
      user: {
        image: this.data.currentUser.image,
        username: this.data.currentUser.username,
      },
      replies: [],
    };
    comment.replies.push(newComment);
  }

  constructor(private fetchCommentsService: FetchCommentsService) {}

  ngOnInit(): void {
    this.fetchCommentsService.getData().subscribe((result) => {
      this.data = result;
    });
  }
}
