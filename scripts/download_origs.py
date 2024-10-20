import json
from os import path
import requests
from pathlib import Path

def main(): 
    with open('images.json') as f:
        data = json.load(f)
    for image in data["value"]:
        sources = image["value"]["image_sources"]
        try: 
            source = [s for s in sources if s["value"]["is_original"] == True][0]["value"]["href"]
            response = requests.get(f"https://wry.ch{source}")
            if response.status_code == 200:
                image_id = image['value']['id']
                file_path = Path(f"downloads/{image_id}.webp")
                file_path.parent.mkdir(parents=True, exist_ok=True)
                with open(file_path, 'wb') as f:
                    f.write(response.content)
                print(f"Downloaded image {image['value']['id']} to {file_path}")
            else:
                print(f"Failed to download image {image['value']['id']}")
        except Exception as e:
            print(e)
            print(f"No original source found for {image['value']['id']}")
            continue

if __name__ == '__main__':
    main()