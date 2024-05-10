import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  },
  { timestamps: false }
);

export const Document = sequelize.define(
  'document',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export const News = sequelize.define(
  'news',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    date_publication: { type: DataTypes.DATE, allowNull: false },
    content: { type: DataTypes.TEXT },
  },
  { timestamps: false }
);

export const Image = sequelize.define(
  'image',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export const Link = sequelize.define(
  'link',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export const File = sequelize.define(
  'file',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

User.hasMany(Document);
Document.belongsTo(User);

User.hasMany(News);
News.belongsTo(User);

News.hasMany(Image, { onDelete: 'CASCADE' });
Image.belongsTo(News);

News.hasMany(Link, { onDelete: 'CASCADE' });
Link.belongsTo(News);

News.hasMany(File, { onDelete: 'CASCADE' });
File.belongsTo(News);

