import sequelize from "../db.js"
import { DataTypes } from "sequelize"

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
})

const Document = sequelize.define("document", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
})

const News = sequelize.define("news", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  date_publication: { type: DataTypes.DATE, allowNull: false },
  content: { type: DataTypes.TEXT },
})

const Image = sequelize.define("image", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
})

const Link = sequelize.define("link", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.ARRAY(DataTypes.STRING) },
})
const File = sequelize.define("file", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
})

User.hasMany(Document)
Document.belongsTo(User)

User.hasMany(News)
News.belongsTo(User)

News.hasMany(Image)
Image.belongsTo(News)

News.hasOne(Link)
Link.belongsTo(News)

News.hasMany(File)
File.belongsTo(News)

export default {
  User,
  Document,
  News,
  Image,
  Link,
  File,
}
