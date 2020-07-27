const PORT = '5000';

let matches = window.location.href.match(/(\w+):\/\/(.*):(\d+)/);
let hostname = matches[1] + '://' + matches[2] + ':' + PORT;

export default hostname;
