import Vue from 'vue';

import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Badge,
  Container,
  Header,
  Aside,
  Main,
  Loading,
  MessageBox,
  Message,
  Notification,
  Avatar,
  Card,
  Form,
  FormItem,
  Switch,
  Checkbox,
  CheckboxGroup,
  Upload,
  TimePicker,
  DatePicker,
  Popover,
  Drawer,
  Pagination,
  ColorPicker,
  RadioButton,
  RadioGroup,
  Radio,
  Link,
  InputNumber,
  Transfer,
  Row,
  Col,
  Scrollbar,
  Collapse,
  CollapseItem,
  Breadcrumb,
  BreadcrumbItem,
  Autocomplete,
  PageHeader,
  Divider,
  Tooltip,
  Progress,
  ButtonGroup,
  Steps,
  Step,
  Alert,
  Cascader,
  OptionGroup,
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Container);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Card);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(PageHeader);
Vue.use(Steps);
Vue.use(Step);

Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(Avatar);
Vue.use(Badge);
Vue.use(Tag);

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Upload);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(ColorPicker);
Vue.use(Link);
Vue.use(InputNumber);
Vue.use(Transfer);
Vue.use(ButtonGroup);
Vue.use(Cascader);

Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Drawer);
Vue.use(Tooltip);
Vue.use(Progress);
Vue.use(Alert);

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tree);

Vue.use(Row);
Vue.use(Col);
Vue.use(Scrollbar);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Pagination);

Vue.use(Autocomplete);
Vue.use(Divider);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
