import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import CustomerAdd from './components/CustomerAdd';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';

// 기본 테마 생성
const theme = createTheme();

const Root = styled('div')({
  width: "100%",
  minWidth: 1080,
});

const Menu = styled('div')({
  marginTop: 15,
  marginBottom: 15,
  display: 'flex',
  justifyContent: 'center',
});

const PaperStyled = styled(Paper)({
  marginLeft: 18,
  marginRight: 18,
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const styles = {
  grow: {
    flexGrow: 1,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    };
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  stateRefresh() {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  handleValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const filteredComponents = (data) => {
      return data
        .filter(c => c.name.indexOf(this.state.searchKeyword) > -1)
        .map(c => (
          <Customer 
            stateRefresh={this.stateRefresh} 
            key={c.id} 
            id={c.id} 
            image={c.image} 
            name={c.name} 
            birthday={c.birthday} 
            gender={c.gender} 
            job={c.job} 
          />
        ));
    };

    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    
    return (
      <ThemeProvider theme={theme}>
        <Root>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                고객 관리 시스템
              </Typography>
              <div style={styles.grow} />
              <Search>
                <div>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="검색하기"
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  value={this.state.searchKeyword}
                  onChange={this.handleValueChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
          <Menu>
            <CustomerAdd stateRefresh={this.stateRefresh} />
          </Menu>
          <PaperStyled>
            <Table>
              <TableHead>
                <TableRow>
                  {cellList.map(c => (
                    <TableCell key={c}>{c}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.customers ? (
                  filteredComponents(this.state.customers)
                ) : (
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress variant="determinate" value={this.state.completed} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </PaperStyled>
        </Root>
      </ThemeProvider>
    );
  }
}

export default App;
