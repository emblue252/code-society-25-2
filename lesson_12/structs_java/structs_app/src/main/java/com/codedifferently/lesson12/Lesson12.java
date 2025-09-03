package com.codedifferently.lesson12;

public class Lesson12 {

  /**
   * Provide the solution to LeetCode 3062 here:
   * https://github.com/yang-su2000/Leetcode-algorithm-practice/tree/master/3062-winner-of-the-linked-list-game
   */
  public String gameResult(ListNode head) {
    if (head == null) {
      return "Tie";
    }

    int evenWins = 0;
    int oddWins = 0;
    ListNode current = head;

    while (current != null && current.next != null) {
      int evenValue = current.val;
      int oddValue = current.next.val;

      if (evenValue > oddValue) {
        oddWins++;
      }
        current = current.next.next;
    }

    if (evenWins > oddWins) {
      return "Even";
    } else if (oddWins > evenWins) {
        return "Odd";
    } else {
        return "Tie";
    }
  }
}
