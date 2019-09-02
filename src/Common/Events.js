import EventEmitter from "@services/AppEventEmitter";

const openLeftMenu = () => EventEmitter.emit('left.menu.click');
const closeLeftMenu = () => EventEmitter.emit('left.menu.close');
const openModalLayout = () => EventEmitter.emit('modal.layout.open');
const closeModalLayout = () => EventEmitter.emit('modal.layout.close');
const openModalTag = () => EventEmitter.emit('modal.tag.open');
const openModalCategory = () => EventEmitter.emit('modal.category.open');
const closeModalTag = () => EventEmitter.emit('modal.tag.close');
const loginRefresh = () => EventEmitter.emit("login.refresh");
const loginShowError = (params) => EventEmitter.emit("login.showError", params);
const loginShowInfo = (params) => EventEmitter.emit("login.showInfo", params);
const logoutUser = () => EventEmitter.emit("logout.user");

const homePageRefresh = () => EventEmitter.emit("homepage.refresh");
const sideMenuRefresh = () => EventEmitter.emit("sidemenu.refresh");

const openUserModal = () => EventEmitter.emit('modal.user.open');
const closeUserModal = () => EventEmitter.emit('modal.user.close');

const onOpenLeftMenu = (func) => EventEmitter.addListener("left.menu.click", func);
const onCloseLeftMenu = (func) => EventEmitter.addListener("left.menu.close", func);
const onOpenModalLayout = (func) => EventEmitter.addListener("modal.layout.open", func);
const onOpenModalTag = (func) => EventEmitter.addListener("modal.tag.open", func);
const onOpenModalCategory= (func) => EventEmitter.addListener("modal.category.open", func);
const onOpenUserModal = (func) => EventEmitter.addListener("modal.user.open", func);
const onCloseUserModal = (func) => EventEmitter.addListener('modal.user.close',func);
const onLoginShowError = (func) => EventEmitter.addListener("login.showError",func);
const onLoginShowInfo = (func) => EventEmitter.addListener("login.showInfo", func);
const onLogoutUser = (func) => EventEmitter.addListener("logout.user", func);


const onSideMenuRefresh = (func) => EventEmitter.addListener("sidemenu.refresh", func);

export default ({
  openLeftMenu, closeLeftMenu, openModalLayout, closeModalLayout, openModalTag,
  openUserModal,
  closeUserModal,
  loginShowError,
  loginShowInfo,
  loginRefresh,
  logoutUser,
  homePageRefresh,
  sideMenuRefresh,
  openModalCategory,

  //listener
  onOpenLeftMenu,
  onCloseLeftMenu,
  onOpenModalLayout,
  onOpenModalTag,
  onOpenUserModal,
  onCloseUserModal,
  onLoginShowError,
  onLogoutUser,
  onSideMenuRefresh,
  onOpenModalCategory,
});
