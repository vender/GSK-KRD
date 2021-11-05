import React, {Fragment, useState, useEffect } from "react";
import { useShowController, useDataProvider, useGetIdentity, Loading, BulkDeleteButton, SimpleShowLayout, Datagrid, List, Show, Create, Edit, SimpleForm, TextField, TextInput, ShowButton, ArrayInput, SimpleFormIterator, EditButton } from "react-admin";
import Poll from 'react-polls';

const BulkActionButtons = props => (
  <Fragment>
      <BulkDeleteButton {...props} />
  </Fragment>
);

export const PollsList = ({ permissions, ...props }) => {
  // console.log(linkToRecord(props.basePath || `/${props.resource}`, record.id));
  return (
    <List {...props} bulkActionButtons={permissions === 'admin' && <BulkActionButtons />} >
        <Datagrid>
            <TextField source="question" label="Вопрос" />
            <ShowButton label="" />
            {permissions === 'admin' && <EditButton label="" />}
        </Datagrid>
    </List>
  )
};

export function PollsCreate ({ permissions, ...props }) {
    return(
      <Create title="Добавить голосование" {...props} >
        <SimpleForm>
          <TextInput source="question" label="Вопрос" fullWidth={true} />
          <ArrayInput label="Варианты ответа" source="answers">
            <SimpleFormIterator >
                <TextInput source="option" label="Вариант ответа" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleForm>
      </Create>
    )
};

export const PollsShow = (props) => {
    const pollStyles1 = {
        questionSeparator: true,
        questionSeparatorWidth: 'question',
        questionBold: true ,
        questionColor: '#303030',
        align: 'center',
        theme: 'purple'
    }

    const [answer, setAnswer] = useState();
    const [loading, setLoading] = useState(true);
    const dataProvider = useDataProvider();
    const { record, loading: recordloading } = useShowController(props);
    const { identity, loading: userloading } = useGetIdentity();
    const [answers, setAnswers] = useState();
    
    useEffect(() => {
      if(identity){
        dataProvider.getList('pollresult', { pagination: { page: 1, perPage: 500 }, sort: { field: 'id', order: 'ASC' }, filter: {q:'', poll_id: props.id} })
            .then(({ data }) => {
              const userAnswer = data.filter(poll => poll.user_id === identity.id);
              if(userAnswer.length) {
                setAnswer(userAnswer[0].answer);
              } else {
                setAnswer('');
              }
              const answersCount = Object.entries(record.answers).map(pollans => {
                return { ...pollans[1], votes: data.filter(poll => poll.answer === pollans[1].option).length };
              });
              setAnswers(answersCount);
              setLoading(false);
            })
            .catch(error => {
              console.log(error)
            })
      }
    }, [identity]);

    const HandleVote = voteAnswer => {
      setLoading(true);
      dataProvider.create('pollresult', { data: { user_id: identity.id, poll_id: props.id, answer: voteAnswer } })
            .then(({ data }) => {
              const newAnswers = answers.map(ans => {
                if (ans.option === voteAnswer) ans.votes++
                return ans
              })
              setAnswers(newAnswers);
              setAnswer(data.answer);
              setLoading(false);
            })
            .catch(error => {
              console.log(error)
            })
    }

    if (recordloading || userloading || loading) { return <Loading /> }

    return(
        <Show {...props}>
            <SimpleShowLayout>
                <Poll question={record.question} answers={answers} onVote={HandleVote} customStyles={pollStyles1} vote={answer} noStorage />
            </SimpleShowLayout>
        </Show>
    )
};

export const PollsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
        <TextInput source="question" label="Вопрос" fullWidth={true} />
        <ArrayInput label="Варианты ответа" source="answers">
            <SimpleFormIterator >
                <TextInput source="option" label="Вариант ответа" />
            </SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>
  </Edit>
);