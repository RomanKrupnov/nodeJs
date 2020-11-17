const Rows = require('./models/task.js');

Rows.selectRows();
Rows.insertRows(100,'Roman','Very Good');
Rows.updateRows(6,200,'Igor','Good');
Rows.deleteRows(20);
