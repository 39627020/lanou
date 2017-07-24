import React from 'react';
import {Table} from 'antd';
import styles from './List.less';

const List = ({...tableProps}) => {
  const columns=[
    {
      title: 'Image',
      dataIndex: 'image',
      className: styles.image,
      width: 64,
      render: (text) => <img alt="Feture" width={26} src={text} />,
    },{
      title: '试题类型',
      dataIndex: 'type',
      render:(text)=> text === "QUESTION"?"选择题":"问答题",
    },
]


  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{x: 800}}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  );
};
export default List;
