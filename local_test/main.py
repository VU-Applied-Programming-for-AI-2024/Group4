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

async def main():
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
main()
