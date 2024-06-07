import pygame

pygame.init()

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption('pour and listen prototype')
bg = pygame.image.load("simple_bg.jpeg")

def background_stardew(image):
    size = pygame.transform.scale(image, (800,600))
    screen.blit(size, (0,0))

# Player
player_image = pygame.image.load("cat.png")
player_image = pygame.transform.scale(player_image, (50, 50))
playerX = 400
playerY = 300
player_speed = 1
    

# NPC
npc_image = pygame.image.load("kitty.png")
npc_image = pygame.transform.scale(npc_image, (50, 50))

# NPC position
npcX = 200
npcY = 200

# check if player is near NPC
def is_near(playerX, playerY, npcX, npcY, distance=50):
    return abs(playerX - npcX) < distance and abs(playerY - npcY) < distance


show_dialog = False
run = True
while run:
    
    background_stardew(bg)
    # Draw the player and NPC image at the current position
    screen.blit(player_image, (playerX, playerY))
    screen.blit(npc_image, (npcX, npcY))
    # screen.fill((0,0,0))
    
    # player()
    
    #checks which keys are being pressed
    key = pygame.key.get_pressed()
    
    if key[pygame.K_LEFT]:
        playerX -= player_speed
    if key[pygame.K_RIGHT]:
        playerX += player_speed
    if key[pygame.K_UP]:
        playerY -= player_speed
    if key[pygame.K_DOWN]:
        playerY += player_speed
        
    # if key[pygame.K_LEFT] == True:
    #     player.move_ip(-1,0)
    # if key[pygame.K_RIGHT] == True:
    #     player.move_ip(1,0)
    # if key[pygame.K_UP] == True:
    #     player.move_ip(0,-1)
    # if key[pygame.K_DOWN] == True:
    #     player.move_ip(0,1)  
         
         
    #event handler which allows you to close the screen
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        elif event.type == pygame.KEYDOWN and event.key == pygame.K_e:
            if is_near(playerX, playerY, npcX, npcY):
                show_dialog = not show_dialog

   # Check if the player is near the NPC
    if is_near(playerX, playerY, npcX, npcY):
        # Display a message or dialog
        font = pygame.font.Font(None, 36)
        text = font.render("Hello! Press 'E' to talk.", True, (255, 255, 255))
        screen.blit(text, (npcX, npcY - 40))
        
    if show_dialog:
        font = pygame.font.Font(None, 36)
        dialog = font.render("NPC: Nice to meet you!", True, (255, 255, 255))
        pygame.draw.rect(screen, (0, 0, 0), (50, 50, 700, 100))
        screen.blit(dialog, (60, 60))

    #refreshes screen
    pygame.display.update()
pygame.quit()