import EditQuestionBox from "./EditQuestionBox"
const EditComponent = ({ questions }) => {
    return (
        <div  className=' md:flex md:flex-wrap flex-row justify-evenly'>{questions?.length > 0 ?
            (questions.map(e =>
                <div className="mt-1 " >
                    <EditQuestionBox key={e._id} question={e} />
                </div>
            ))
            :
            <p>Questions not Added</p>}</div>
    )
}

export default EditComponent