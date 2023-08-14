import pygame
import sys

#initialize game
pygame.init()

#setup the game window

window_width = 1000
window_height = 800
window = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption("Pong Game")

#setup paddles
paddle_width = 10
paddle_height = 200
player1_paddle = pygame.Rect(50, window_height // 2 - paddle_height // 2, paddle_width, paddle_height)
player2_paddle = pygame.Rect(window_width - 50 - paddle_width, window_height // 2 - paddle_height // 2, paddle_width, paddle_height)

#set up ball
ball = pygame.Rect(window_width // 2 - 15, window_height // 2 - 15, 30, 30)
ball_speed_x = 0
ball_speed_y = 0
ball_moving = False

#define scores and winning score
player1_score = 0
player2_score = 0
winning_score = 5

#font for scoreboard
font = pygame.font.Font(pygame.font.get_default_font(), 36)
    
#set up game loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                ball_speed_x = 1
                ball_speed_y = 1
                ball_moving = True
    #update scores and check for win condition
    if ball.left <= 0:
        player2_score += 1
        if player2_score >= winning_score:
            print("Player 2 Wins!!")
            replay = input("Do you want to play again? (y/n): ")
            if replay.lower() == "y":
                player1_score = 0
                player2_score = 0
                ball_speed_x = abs(ball_speed_x)
                ball.x = window_width // 2-15
                ball.y = window_height // 2-15
            else:
                pygame.quit()
                sys.exit()
        else:
        # Reset ball position
            ball.x = window_width // 2-15
            ball.y = window_height // 2-15
            ball_speed_x = abs(ball_speed_x)
    
    if ball.right >= window_width:
        player1_score += 1
        if player1_score >= winning_score:
            print ("Player 1 wins !!")
            replay = input("Do you want to play again? (y/n):")
            if replay.lower() == "y":
                player1_score = 0
                player2_score = 0
                ball_speed_x = abs(ball_speed_x)
                ball.x = window_width // 2-15
                ball.y = window_height // 2-15
            else:
                pygame.quit()
                sys.exit()
        else:
            # Reset ball position
            ball.x = window_width // 2-15
            ball.y = window_height // 2-15
            ball_speed_x = abs(ball_speed_x)

            
    #move the paddles
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w] and player1_paddle.top > 0:
        player1_paddle.y -=3
    if keys[pygame.K_s] and player1_paddle.bottom < window_height:
        player1_paddle.y +=3
    if keys[pygame.K_UP] and player2_paddle.top > 0:
        player2_paddle.y -=3
    if keys[pygame.K_DOWN] and player2_paddle.bottom < window_height:
        player2_paddle.y +=3
        
    #update ball position if moving
    if ball_moving:
        ball.x += ball_speed_x
        ball.y += ball_speed_y
    
        #bounce the ball of walls
        if ball.top <= 0 or ball.bottom >= window_height:
            ball_speed_y = -ball_speed_y
        
    #bounce the ball of paddles
        if ball.colliderect(player1_paddle):
            ball_speed_x = -ball_speed_x
        if ball.colliderect(player2_paddle):
            ball_speed_x = -ball_speed_x
        
    # Draw everything
    window.fill((0, 0, 0)) #clear the screen
    pygame.draw.rect(window, (255, 255, 255), player1_paddle)
    pygame.draw.rect(window, (255, 255, 255), player2_paddle)
    pygame.draw.ellipse(window, (255, 255, 255), ball)
    
    # Draw the scoreboard
    
    score_text = f"Player 1: {player1_score}    Player 2: {player2_score}"
    score_color = (255, 255, 255)
    score_surface = font.render(score_text, True, score_color)
    score_position = (window_width // 2 - score_surface.get_width() // 2, 10)
    window.blit(score_surface, score_position)

    
    if player1_score >= winning_score or player2_score >= winning_score:
        replay_question = font.render("Do you want to play again? (y/n)", True, (255, 255, 255))
        replay_position = (window_width // 2 - replay_question.get_width() //2, window_height // 2)
        window.blit(replay_question, replay_position)
   
    pygame.display.update() 
    
    
    
   
    
    