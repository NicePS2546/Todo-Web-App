import PropTypes from 'prop-types';

const Todos = ({todo}) =>{
    Todos.propTypes = {
      todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        isCompleted: PropTypes.bool.isRequired,
        CreateAt: PropTypes.string.isRequired, // Adjust the type if needed
        updatedAt: PropTypes.string.isRequired, // Adjust the type if needed
        users: PropTypes.shape({
          id: PropTypes.string.isRequired,
          // Define other properties of the 'users' relation if needed
        }),
        userId: PropTypes.string, // It's optional, so no 'isRequired'
      }).isRequired,
    
    }     
}

export default Todos;