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
     (10 if (r == 223 and g == 178 and b == 252) else 
      (11 if (r == 255 and g == 205 and b == 0) else 
       12 if (r == 240 and g == 214 and b == 254) else
       0)))))))
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
            elif collision_map[y][x] == 10:
                image.putpixel((x, y), (255, 0, 255))
            elif collision_map[y][x] == 11:
                image.putpixel((x, y), (255, 255, 255))
            elif collision_map[y][x] == 12:
                image.putpixel((x, y), (0, 0, 0))

    return image

def save_collision_map_to_json(collision_map, json_path):
    with open(json_path, 'w') as json_file:
        json.dump(collision_map, json_file)

# 示例用法
if __name__ == "__main__":
    image_path = './img/bgr/chapter4_background_marked.png'  
    json_path = './other/collision_map4.json'  # 保存的JSON文件路径

    collision_map, image = generate_collision_map(image_path)
    save_collision_map_to_json(collision_map, json_path)

    marked_image = mark_collision_map(collision_map, image)
    marked_image.save('marked_image4.png')  # 保存标记后的图片