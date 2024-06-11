# import requests
import pygame
import asyncio

width = 500
height = 500
window = pygame.display.set_mode((width, height))
pygame.display.set_caption("Client")

player_velocity = 3

clientNumber = 0

class Player:
    def __init__(self, x, y, color, width, height, vel=player_velocity) -> None:
        self.x_ = x
        self.y_ = y
        self.color_ = color
        self.width_ = width
        self.height_ = height
        self.vel_ = vel

    def draw(self, win):
        pygame.draw.rect(win, self.color_, [self.x_, self.y_, self.width_, self.height_])

    def move(self):
        keys = pygame.key.get_pressed()

        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            self.x_ -= self.vel_
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            self.x_ += self.vel_
        if keys[pygame.K_DOWN] or keys[pygame.K_s]:
            self.y_ += self.vel_
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            self.y_ -= self.vel_
    
def redraw(win, player):
    win.fill((255, 255, 255))
    player.draw(win)
    pygame.display.update()
    
# messages = [
#     {
#         "role": "system",
#         "content": "You are a supportive chatbot Dave. Try to answer in a manner like in the next message when user asks for advice.",
#     },
#     {"role": "user", "content": "This week is so tough I don't want to live another one"},
#     {"role": "assistant", "content": "I'm really sorry to hear that you're feeling this way. It sounds like you're going through a really rough patch. It's totally okay to feel overwhelmed sometimes. Is there anything specific that's been weighing on your mind lately? I'm here to listen and offer support however I can."},
# ]
# 
# url_colab = "https://826f-35-185-130-5.ngrok-free.app" + '/predict'
# 
# def get_response():
#     global url_colab
#     res = requests.post(url_colab, json={'user_input': messages})
#     return requests.get(url_colab).json()

async def main():
    # user_message = "Hello World!"
    # messages.append({'role': 'user', 'content': user_message})
    # get_response()
    
    run = True
    p = Player(0, 0, [0, 0, 0], 50, 50, 3)
    clock = pygame.time.Clock()

    while run:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
                pygame,quit()
        p.move()
        redraw(window, p)
        await asyncio.sleep(0)

asyncio.run(main())