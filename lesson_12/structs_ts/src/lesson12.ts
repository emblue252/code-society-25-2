import { ListNode } from './list_node.js';

export class Lesson12 {
  /**
   * Provide the solution to LeetCode 3062 here:
   * https://github.com/yang-su2000/Leetcode-algorithm-practice/tree/master/3062-winner-of-the-linked-list-game
   */
  public gameResult(head: ListNode | null): string {
    if (head === null) {
      return '';
    }

    let evenWins = 0;
    let oddsWins = 0;
    let current: ListNode | null = head;

    while (current !== null && current.next !== null) {
      const evenValue = current.val;
      const oddValue = current.next ? current.next.val : 0;

      if (evenValue > oddValue) {
        evenWins++;
      } else if (oddValue > evenValue) {
        oddsWins++;
      }
      current = current.next && current.next.next ? current.next.next : null;
    }

    if (evenWins > oddsWins) {
      return 'Even';
    } else if (oddsWins > evenWins) {
      return 'Odd';
    } else {
      return 'Tie';
    }
  }

  }
