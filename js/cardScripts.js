function statusMoveRight(theStatus){
  let theStatus = theStatus.toLowerCase();
  switch (theStatus) {
    case 'queue':
      return 'InProgress';
    break;
    case 'inprogress':
      return 'Done';
    break;
    case 'done':
      return 'Queue';
    break;
  }
}

function statusMoveLeft(theStatus){
  let theStatus = theStatus.toLowerCase();
  switch (theStatus) {
    case 'queue':
      return 'Done';
    break;
    case 'done':
      return 'InProgress';
    break;
    case 'inprogress':
      return 'Queue';
    break;
  }
}