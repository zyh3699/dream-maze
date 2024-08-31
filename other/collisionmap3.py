from PIL import Image
import json

def generate_collision_map(image_path):
    image = Image.open(image_path)
    image = image.convert('RGB')
    width, height = image.size
    collision_map = []

    for y in range(height):
        row = []
        for x in range(width):
            r, g, b = image.getpixel((x, y))
            # 如果是白色像素，则标记为1，否则为0
            row.append(1 if (r == 255 and g == 255 and b == 255) else 
 (2 if (r == 0 and g == 0 and b == 0) else 
  (3 if (r == 239 and g == 55 and b == 58) else 
   (4 if (r == 42 and g == 62 and b == 214) else 
    (5 if (r == 0 and g == 122 and b == 65) else
     (6 if (r == 255 and g == 64 and b == 255) else 
      (7 if (r == 148 and g == 62 and b == 146) else
       (8 if (r == 0 and g == 199 and b == 252) else 
        (9 if (r == 255 and g == 165 and b == 125) else 
         (10 if (r == 245 and g == 236 and b == 0) else 
          (11 if (r == 229 and g == 255 and b == 175) else 
           (12 if (r == 255 and g == 87 and b == 157) else 
            (13 if (r == 255 and g == 130 and b == 255) else 
             (14 if (r == 255 and g == 121 and b == 46) else 
              (15 if (r == 255 and g == 229 and b == 46) else 
               (16 if (r == 181 and g == 204 and b == 255) else
                (17 if (r == 180 and g == 216 and b == 224) else 
                 (18 if (r == 100 and g == 100 and b == 24) else 
                  (19 if (r == 128 and g == 77 and b == 155) else 0)))))))))))))))))))
        collision_map.append(row)

    return collision_map, image

def mark_collision_map(collision_map, image):
    width, height = image.size

    for y in range(height):
        for x in range(width):
            if collision_map[y][x] == 1:
                image.putpixel((x, y), (255, 0, 0))  # 标记为红色
            elif collision_map[y][x] == 2:
                image.putpixel((x, y), (0, 255, 0))
            elif collision_map[y][x] == 3:
                image.putpixel((x, y), (0, 0, 255))
            elif collision_map[y][x] == 4:
                image.putpixel((x, y), (0, 255, 255))
            elif collision_map[y][x] == 5:
                image.putpixel((x, y), (255, 255, 0))
            elif collision_map[y][x] == 6:
                image.putpixel((x, y), (255,64,255))
            elif collision_map[y][x] == 7:
                image.putpixel((x, y), (255,64,29))
            elif collision_map[y][x] == 8:
                image.putpixel((x, y), (0,199,252))
            elif collision_map[y][x] == 9:
                image.putpixel((x, y), (255,165,125))
            elif collision_map[y][x] == 10:
                image.putpixel((x, y), (245,236,0))
            elif collision_map[y][x] == 11:
                image.putpixel((x, y), (25,236,0))
            elif collision_map[y][x] == 12:
                image.putpixel((x, y), (1,236,0))
            elif collision_map[y][x] == 13:
                image.putpixel((x, y), (24,36,0))
            elif collision_map[y][x] == 14:
                image.putpixel((x, y), (2,36,12))
            elif collision_map[y][x] == 15:
                image.putpixel((x, y), (255,99,99))
            elif collision_map[y][x] == 16:
                image.putpixel((x, y), (2,33,44))
            elif collision_map[y][x] == 17:
                image.putpixel((x, y), (190,33,44))
            elif collision_map[y][x] == 18:
                image.putpixel((x, y), (24,24,44))
            elif collision_map[y][x] == 19:
                image.putpixel((x, y), (128,77,155))

    return image

def save_collision_map_to_json(collision_map, json_path):
    with open(json_path, 'w') as json_file:
        json.dump(collision_map, json_file)

# 示例用法
if __name__ == "__main__":
    image_path = './img/bgr/chapter3_background_marked.png'  
    json_path = './other/collision_map3.json'  # 保存的JSON文件路径

    collision_map, image = generate_collision_map(image_path)
    save_collision_map_to_json(collision_map, json_path)

    marked_image = mark_collision_map(collision_map, image)
    marked_image.save('marked_image3.png')  # 保存标记后的图片