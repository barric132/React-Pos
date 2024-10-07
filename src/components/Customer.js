import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
  },
});

class Customer extends React.Component {
  deleteCustomer = () => {
    const { id } = this.props;
    // 삭제 API 호출 로직을 여기에 추가하세요.
    console.log(`Delete customer with ID: ${id}`);
    this.props.stateRefresh(); // 고객 목록을 새로 고침합니다.
  };

  render() {
    const { id, image, name, birthday, gender, job } = this.props;

    return (
      <StyledTableRow>
        <TableCell>{id}</TableCell>
        <TableCell><img src={image} alt={name} style={{ width: '50px', height: '50px' }} /></TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{birthday}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{job}</TableCell>
        <TableCell>
          <IconButton onClick={this.deleteCustomer}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </TableCell>
      </StyledTableRow>
    );
  }
}

export default Customer;
