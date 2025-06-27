以下是这些变量的中文含义分类整理：

---

### **字体与排版**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `fontFamily`          | 默认字体族                |
| `fontFamilyMono`      | 等宽字体族                |
| `fontWeight`          | 常规字体粗细              |
| `fontWeightStrong`    | 加粗字体粗细              |
| `fontSize`            | 基础字体大小              |
| `fontSizeMini`        | 超小字体                  |
| `fontSizeTiny`        | 极小字体                  |
| `fontSizeSmall`       | 小号字体                  |
| `fontSizeMedium`      | 中号字体                  |
| `fontSizeLarge`       | 大号字体                  |
| `fontSizeHuge`        | 超大字体                  |
| `lineHeight`          | 行高                      |

---

### **尺寸与间距**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `heightMini`          | 超小高度元素（如标签）     |
| `heightTiny`          | 极小高度元素              |
| `heightSmall`         | 小高度元素（如输入框）     |
| `heightMedium`        | 中等高度元素（默认按钮）   |
| `heightLarge`         | 大高度元素                |
| `heightHuge`          | 超大高度元素              |

---

### **颜色主题**
#### 基础色
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `baseColor`           | 基础黑色（深色模式背景）   |
| `primaryColor`        | 主品牌色                 |
| `infoColor`           | 信息色（蓝色系）          |
| `successColor`        | 成功色（绿色系）          |
| `warningColor`        | 警告色（黄色系）          |
| `errorColor`          | 错误色（红色系）          |

#### 颜色状态（以 `primary` 为例）
| 变量名                     | 含义                     |
|----------------------------|--------------------------|
| `primaryColorHover`        | 主色悬停状态             |
| `primaryColorPressed`      | 主色按下状态             |
| `primaryColorSuppl`        | 主色补充色（特殊场景）    |

---

### **文本与图标**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `textColorBase`       | 纯白文本（基准）          |
| `textColor1`          | 一级文本（90% 透明度）    |
| `textColor2`          | 二级文本（82% 透明度）    |
| `textColor3`          | 三级文本（52% 透明度）    |
| `textColorDisabled`   | 禁用文本                 |
| `iconColor`           | 默认图标颜色             |
| `iconColorHover`      | 图标悬停颜色             |
| `iconColorPressed`    | 图标按下颜色             |

---

### **边框与分割线**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `borderRadius`        | 默认圆角                 |
| `borderRadiusSmall`   | 小圆角                   |
| `borderColor`         | 边框颜色                 |
| `dividerColor`        | 分割线颜色               |

---

### **背景与容器**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `bodyColor`           | 页面背景色               |
| `cardColor`           | 卡片背景色               |
| `modalColor`          | 弹窗背景色               |
| `popoverColor`        | 浮层背景色               |
| `inputColor`          | 输入框背景色             |
| `tagColor`            | 标签背景色               |

---

### **交互状态**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `hoverColor`          | 通用悬停背景色           |
| `pressedColor`        | 通用按下背景色           |
| `opacityDisabled`     | 禁用状态透明度           |

---

### **阴影与动效**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `boxShadow1`          | 一级阴影（轻量投影）      |
| `boxShadow2`          | 二级阴影（中等投影）      |
| `boxShadow3`          | 三级阴影（重度投影）      |
| `cubicBezierEaseInOut`| 平滑进出动画曲线         |
| `cubicBezierEaseOut`  | 平滑退出动画曲线         |
| `cubicBezierEaseIn`   | 加速进入动画曲线         |

---

### **滚动条**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `scrollbarColor`      | 滚动条默认颜色           |
| `scrollbarColorHover` | 滚动条悬停颜色           |
| `scrollbarWidth`      | 滚动条宽度               |
| `scrollbarHeight`     | 滚动条高度（横向）       |

---

### **其他专用**
| 变量名                | 含义                     |
|-----------------------|--------------------------|
| `closeIconColor`      | 关闭按钮图标颜色         |
| `clearColor`          | 清除按钮颜色             |
| `railColor`           | 轨道颜色（如 Slider）     |
| `tableHeaderColor`    | 表格标题背景色           |

---

> 注：所有颜色变量均遵循「基础色 + 状态后缀」的命名规则（如 `Hover`/`Pressed`/`Suppl`），其他组件专用变量通常以组件名开头（如 `table`、`card`）。