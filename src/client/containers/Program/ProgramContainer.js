import { connect } from 'react-redux';
import { fetchUserPrograms, addProgram } from '../../actions/programActions';
import { updateUser } from '../../actions/userActions';
import Program from '../../components/Program/Programs';

const mapStateToProps = state => {
  return {
    programs: state.programs,
    user: state.user.item,
    currentProgram: state.currentSession
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserPrograms: () => {
      dispatch(fetchUserPrograms());
    },
    updateUser: user => {
      dispatch(updateUser(user));
    },
    addProgram: program => {
      dispatch(addProgram(program));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Program);
