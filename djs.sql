/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50624
 Source Host           : localhost:3306
 Source Schema         : djs

 Target Server Type    : MySQL
 Target Server Version : 50624
 File Encoding         : 65001

 Date: 07/10/2019 14:53:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `expires` bigint(20) NULL DEFAULT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户姓名',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `sex` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '性别',
  `addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址',
  `design` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图案',
  `price` int(11) NOT NULL COMMENT '售价',
  `time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('15ff34609fb54e6786f6e8c9a2694a95', '叶罕珠', '18067258262', '女', '望湖御景2-2-2803', '', 9000, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('2f7bb1a7271742a7826ffeee28f5e439', '徐小丽', '13879303711', '女', '朱家桥新村', '', 14500, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('2f8caf1452de407c9c22961620975ac5', '韩波琴', '18650915516', '女', '中央城11-1-3217', '', 13500, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('3699d230a7964f98904246f459e179be', '刘欣', '15720933135', '女', '御湖一品C3-1-501', '', 2323, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('3ab55e37f49f4dd892ed2cc971722caa', '黄孝贵', '15107937999', '男', '许家新村', '', 17000, '2018-12-17 00:00:00');
INSERT INTO `customer` VALUES ('55d6e575bd4d48f892dc19067c27d225', '王国建', '15207030266', '男', '湖东村', '', 15300, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('5f557c7b92414a4097ad17fb4e1c1a8f', '戴建亮', '13755375318', '男', '朱家桥新村别墅', '', 12777, '2018-12-17 00:00:00');
INSERT INTO `customer` VALUES ('6393fbbbf3e448f3ac8a50c25be15b6c', '李建国', '15207935886', '男', '许家别墅', '', 23800, '2018-12-01 19:40:31');
INSERT INTO `customer` VALUES ('6474482cb5f04689ad723a97f90248a3', '刘金乐', '13967187819', '男', '湖景联排72号', '', 10500, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('656498339c7347598bc80a559bbfd2e8', '王斌', '18720571005', '男', '杨梅桥竹山下私房', '', 8000, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('67b2dfd5fcab4db3a1067f4cee22c5f6', '店铺帐', '13879303161', '男', '江西省上饶市鄱阳县湖州新天地商业街33-107', '', 0, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('89404158a8c642cfafc096e47eec23c4', '张坚平', '15088939198', '男', '湖城国际19-1-401', '', 6000, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('90ec92af15974ac7871f67881975d678', '汪义顺', '13133607829', '男', '国际华城19-4-402（3F）', '', 6000, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('9c1e176670cc4fcaa2401dd13195b8b2', '胡炳泉', '13766459799', '男', '锦绣润达3-2-2002', '', 1800, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('b8018275acd842699c74c6b7ab04a78d', '王显明', '15179341818', '男', '湖城领秀23-2-706', '', 7000, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('c3924133c02444aca7730cdf507fc7d9', '张德华', '18296342775', '男', '望湖御景3-1-1501', '', 8000, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('c7476050074a40a8b97956bb89c0d230', '孔桂琴', '18607928096', '女', '杨梅桥', '', 9000, '2018-07-04 00:00:00');
INSERT INTO `customer` VALUES ('e2084a1f0abe43d9a6b4671dad970aa0', '程广平', '13970327726', '男', '中央城10-2-1102', '', 4000, '2018-07-04 00:00:00');

-- ----------------------------
-- Table structure for family_account
-- ----------------------------
DROP TABLE IF EXISTS `family_account`;
CREATE TABLE `family_account`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `time` datetime(0) NOT NULL COMMENT '时间',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签',
  `matter` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '事情',
  `account` int(11) NOT NULL COMMENT '费用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of family_account
-- ----------------------------
INSERT INTO `family_account` VALUES ('038a97cae85148a8883cd7738a022b47', '2018-04-12 00:00:00', '其他', '党费', -516);
INSERT INTO `family_account` VALUES ('057b27e13336455c924b256b368e5546', '2018-04-27 00:00:00', '其他', '转帐', 10000);
INSERT INTO `family_account` VALUES ('05af82ea1b184d44a401b8c30a884831', '2018-05-11 00:00:00', '其他', '加油', -200);
INSERT INTO `family_account` VALUES ('0c32351a15074f5689727f49a6e784d1', '2018-04-20 00:00:00', '其他', '摩摩父亲去逝', -200);
INSERT INTO `family_account` VALUES ('11783f1da0904217bfbe17a9c6f70324', '2018-03-21 00:00:00', '其他', '15万贷款利息', -3263);
INSERT INTO `family_account` VALUES ('190a669792074391b7815cb7dcf72004', '2018-06-01 00:00:00', '其他', '李骏工商行借贷还款', -3024);
INSERT INTO `family_account` VALUES ('24064d05218c4781b912aceaa76733da', '2018-02-24 00:00:00', '其他', '上年结转', 31000);
INSERT INTO `family_account` VALUES ('261c6db4935d4f78a449e95f3c0f68cc', '2018-06-13 20:50:34', '其他', '转帐（秀红经手）', 7800);
INSERT INTO `family_account` VALUES ('30d9f0fee9af4b98ba8f5173814b7eb5', '2018-12-06 00:00:00', '其他', '15万贷款利息', 3335);
INSERT INTO `family_account` VALUES ('330f95ce63744f98879749a9bfbdc03c', '2018-04-30 00:00:00', '其他', '朱晓军女儿结婚', -400);
INSERT INTO `family_account` VALUES ('3765bf29073742928182b2b3955edf6e', '2018-03-07 00:00:00', '其他', '李骏工商行借贷还款', -1024);
INSERT INTO `family_account` VALUES ('3adcbf4643854dd8a221de21649e550e', '2018-04-23 00:00:00', '其他', '电费82水费13', -95);
INSERT INTO `family_account` VALUES ('3b8211b87fad4de3b4a4b90b87e09c21', '2018-04-09 00:00:00', '其他', '严文进等门票', -450);
INSERT INTO `family_account` VALUES ('4072a63e6dd4473c80b4fc1faea50ea2', '2018-06-17 00:00:00', '其他', '过路费停车', -240);
INSERT INTO `family_account` VALUES ('42dc6494c7f34742aca2700656237bce', '2018-06-09 00:00:00', '其他', '6月份工资  ', 4912);
INSERT INTO `family_account` VALUES ('464838cfd8c24470bec024a1731bfa9a', '2018-03-15 00:00:00', '其他', '保险（强险950 车船费360）', -1310);
INSERT INTO `family_account` VALUES ('46caeff9a51a443aa132862ecf456879', '2018-04-07 00:00:00', '其他', '李骏工商行借贷还款', -3024);
INSERT INTO `family_account` VALUES ('4c26f38e5f564cdca7eb631c525e192a', '2018-03-09 00:00:00', '其他', '转来老帐', 9200);
INSERT INTO `family_account` VALUES ('4fd707c6a95f438c815be47a646bd157', '2018-05-07 00:00:00', '其他', '李骏工商行借贷还款', -3024);
INSERT INTO `family_account` VALUES ('527ce6578d2042d5a0435ff6f8e17b24', '2018-02-27 00:00:00', '其他', '到婺源过路费', -123);
INSERT INTO `family_account` VALUES ('54b372eb0c3c4d3cb867c5d8e41d0c0c', '2018-02-28 00:00:00', '其他', '设计费', 1000);
INSERT INTO `family_account` VALUES ('5afd6a70bdfc424cb7f5f811a0245a52', '2018-04-26 00:00:00', '其他', '加油', -200);
INSERT INTO `family_account` VALUES ('5d8b9c5f36374ef6b21f2ea0b7e89e3e', '2018-03-18 00:00:00', '水费', '水费', -33);
INSERT INTO `family_account` VALUES ('626bbb680cf4488eac29c6720aeff7ee', '2018-03-05 00:00:00', '其他', '林地变更补助', 2000);
INSERT INTO `family_account` VALUES ('645c861d08134fdfbb8e5d75fd05ee8a', '2018-05-11 00:00:00', '其他', '姚丽君结婚', -200);
INSERT INTO `family_account` VALUES ('71aa32a4d5724abdae70e8311e3d8d9d', '2018-02-26 00:00:00', '其他', '晚歺', -560);
INSERT INTO `family_account` VALUES ('73320d7921754aa6898202596e40436d', '2018-05-18 00:00:00', '其他', '到青岛机票等', -2000);
INSERT INTO `family_account` VALUES ('74d17bb1692d44609f3a8e419d2b9e50', '2018-04-06 00:00:00', '其他', '加油', -200);
INSERT INTO `family_account` VALUES ('76942a903891452ca976df29b7846390', '2018-05-10 00:00:00', '其他', '请刘春阳等人', -160);
INSERT INTO `family_account` VALUES ('789cfd6cc36e43a9a4701b186d45ac35', '2018-04-27 00:00:00', '其他', '值班费', 440);
INSERT INTO `family_account` VALUES ('7dbd4fc6e80f4911a59135ca8d69a1ac', '2018-05-23 00:00:00', '其他', '电费49，水费42', -91);
INSERT INTO `family_account` VALUES ('7e2e57ab7cb14e98bbf9eac922a5738e', '2018-04-13 00:00:00', '其他', '加油', -200);
INSERT INTO `family_account` VALUES ('832a7d3d0cde45d083e8fb06783e39ca', '2018-05-26 00:00:00', '其他', '加油', -285);
INSERT INTO `family_account` VALUES ('8a887055e092479182247782c4b244db', '2018-06-05 00:00:00', '其他', '车辆违停罚款', -150);
INSERT INTO `family_account` VALUES ('8f81bbd2a3f347a98fbbd9f720075fb3', '2018-06-17 00:00:00', '其他', '端午节', -1000);
INSERT INTO `family_account` VALUES ('8fd2c1687d424333b973bf642709535f', '2018-05-05 00:00:00', '其他', '转来老帐', 8000);
INSERT INTO `family_account` VALUES ('9564e9b873084e50ad5a253d68426976', '2018-03-07 00:00:00', '其他', '秀红医保', -360);
INSERT INTO `family_account` VALUES ('9cc1509f59024092bf842ac5e6fa83b9', '2018-06-03 00:00:00', '其他', '转帐（秀红经手）', 9000);
INSERT INTO `family_account` VALUES ('a4118306549a40749db1585a091368d2', '2018-02-28 00:00:00', '其他', '加油', -310);
INSERT INTO `family_account` VALUES ('a7581490284b4e4b82a92e0baae80b51', '2018-04-12 00:00:00', '其他', '转帐', 3000);
INSERT INTO `family_account` VALUES ('ad483e65e0b6406f9f0614a85690e253', '2018-05-20 00:00:00', '其他', '车子保养', -350);
INSERT INTO `family_account` VALUES ('b84dbc658697491e95a3296a4a1e3098', '2018-05-04 00:00:00', '其他', '请彭学主吃饭', -500);
INSERT INTO `family_account` VALUES ('bad90c91cd144919b344d43293616948', '2018-02-28 00:00:00', '其他', '盛少春女儿结婚中午', -200);
INSERT INTO `family_account` VALUES ('bcecd3f5777345acae738b6ebd00e3f3', '2018-02-28 00:00:00', '其他', '胡永松女儿结婚中午', -200);
INSERT INTO `family_account` VALUES ('bebef28bd80847098f4ac4b97f78296d', '2018-03-15 00:00:00', '其他', '3月份工资  转来老帐', 6912);
INSERT INTO `family_account` VALUES ('c5795cc8db214d9d8761e7789471ba42', '2018-03-09 00:00:00', '其他', '加油洗车', -220);
INSERT INTO `family_account` VALUES ('c5837e1ea87d448285080c2966c2c141', '2018-03-15 00:00:00', '其他', '违章罚款560 委托年检', -1560);
INSERT INTO `family_account` VALUES ('c815378d84d34ee3bcb1f2ebe6d2bff3', '2018-03-28 00:00:00', '其他', '3月份电费', -71);
INSERT INTO `family_account` VALUES ('cabfa836a6b04792861d68944f649976', '2018-05-16 00:00:00', '其他', '转帐', 1160);
INSERT INTO `family_account` VALUES ('cb44eee3934947369d1a82335be3e396', '2018-03-22 00:00:00', '其他', '加油', -200);
INSERT INTO `family_account` VALUES ('cb7ed4d264e1445faa0f15650546c551', '2018-04-27 00:00:00', '其他', '汪国庆女儿结婚', -200);
INSERT INTO `family_account` VALUES ('cb9d51d149f146e1911fb66f05034c39', '2018-05-29 00:00:00', '其他', '过路费停车', -160);
INSERT INTO `family_account` VALUES ('d859e80104204f08b61f70f1100502fc', '2018-05-16 00:00:00', '其他', '5月份工资  ', 4912);
INSERT INTO `family_account` VALUES ('e25a7742ce3b49989502fd6fa157a654', '2018-05-18 00:00:00', '其他', '洗衣服铝条等', -75);
INSERT INTO `family_account` VALUES ('e2b309cef1774535bc906fa46c3b8826', '2018-04-26 00:00:00', '其他', '父亲转来', 5000);
INSERT INTO `family_account` VALUES ('ea99d17c10944e1097c6c3e68e8f8c99', '2018-04-24 00:00:00', '其他', '黄雪娇公公去逝', -200);
INSERT INTO `family_account` VALUES ('edddfac4ccfa4001b15a281c2cb9e30a', '2018-04-13 00:00:00', '其他', '4月份工资  ', 4912);
INSERT INTO `family_account` VALUES ('efb9e1833c3d4f019a2067d00a01b763', '2018-02-28 00:00:00', '其他', '2月份电费', -114);
INSERT INTO `family_account` VALUES ('f59ea5e5001f45569ce48571a2eeb24a', '2018-06-04 00:00:00', '其他', '到南昌加油过路费', -304);

-- ----------------------------
-- Table structure for shop_account
-- ----------------------------
DROP TABLE IF EXISTS `shop_account`;
CREATE TABLE `shop_account`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `time` datetime(0) NOT NULL COMMENT '时间',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '标签',
  `matter` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '事情',
  `account` int(11) NOT NULL COMMENT '费用',
  `customer_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户id外键',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_sa_cus`(`customer_id`) USING BTREE,
  CONSTRAINT `fk_sa_cus` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of shop_account
-- ----------------------------
INSERT INTO `shop_account` VALUES ('0a834cc479154a99aab0314df20073b2', '2019-10-07 00:00:00', '付货款', '付货款', 1000, '656498339c7347598bc80a559bbfd2e8');
INSERT INTO `shop_account` VALUES ('32756204311741e29bab1994eb425be5', '2019-10-07 00:00:00', '定金', '定金', 1000, '55d6e575bd4d48f892dc19067c27d225');
INSERT INTO `shop_account` VALUES ('3a03e376d5dc4e5bba450ffe22894566', '2018-12-07 00:00:00', '托运费', '托运费', -1200, '656498339c7347598bc80a559bbfd2e8');
INSERT INTO `shop_account` VALUES ('4cf0f578e90c4cb8a6fdbd44285d94cf', '2018-12-11 00:00:00', '尾款', '尾款', 2121, '89404158a8c642cfafc096e47eec23c4');
INSERT INTO `shop_account` VALUES ('603a50e9c48a486dba30f70d2c6de78d', '2019-04-03 00:00:00', '付货款', '付货款', -1000, '55d6e575bd4d48f892dc19067c27d225');
INSERT INTO `shop_account` VALUES ('64d25eb02b1543f0ad592e2f77a73f02', '2018-11-01 00:00:00', '定金', '定金', 11, '55d6e575bd4d48f892dc19067c27d225');
INSERT INTO `shop_account` VALUES ('800fcbd861244db7b24915cde7c997c4', '2019-10-01 00:00:00', '定金', '定金', 1000, '656498339c7347598bc80a559bbfd2e8');
INSERT INTO `shop_account` VALUES ('98151ce33e8b431db5338d89cf6d0116', '2019-10-07 00:00:00', '定金', '定金', 1000, 'b8018275acd842699c74c6b7ab04a78d');
INSERT INTO `shop_account` VALUES ('98e9076303a041798ed934fb88aaf772', '2018-12-13 00:00:00', '定金', '定金', 2000, '656498339c7347598bc80a559bbfd2e8');
INSERT INTO `shop_account` VALUES ('9bf8eab5b3ce49939e4d6ca54af2500a', '2018-12-05 00:00:00', '结构胶', '结构胶', -1200, '656498339c7347598bc80a559bbfd2e8');
INSERT INTO `shop_account` VALUES ('a3a4b738b03c40879e4a624421f8d72f', '2019-10-07 00:00:00', '付货款', '付货款', 1000, 'b8018275acd842699c74c6b7ab04a78d');

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `user_loginname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_role_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_role_id`(`user_role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('0fa8946c914f4128aabafd94b7f20472', 'admin', '111111', '系统管理员', '1');
INSERT INTO `tbl_user` VALUES ('a1c8f644822c43be90675e5ebada1293', 'user', 'E10ADC3949BA59ABBE56E057F20F883E', NULL, '2');
INSERT INTO `tbl_user` VALUES ('ae8fb14091834d06bfd8d0d8d5828407', 'test', '123456', '测试用户', '2');

SET FOREIGN_KEY_CHECKS = 1;
