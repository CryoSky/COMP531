
var Bullet = function(context,owner,type,dir){
	this.ctx = context;
	this.x = 0;
	this.y = 0;
	this.owner = owner; 
	this.type = type;
	this.dir = dir;
	this.speed = 3;
	this.size = 6;
	this.hit = false;
	this.isDestroyed = false;
	
	this.draw = function(){
		this.ctx.drawImage(Obj_img,80+this.dir*this.size,96,this.size,this.size,this.x,this.y,this.size,this.size);
		this.move();
	};
	
	this.move = function(){
		if(this.dir == UP){
			this.y -= this.speed;
		}else if(this.dir == DOWN){
			this.y += this.speed;
		}else if(this.dir == RIGHT){
			this.x += this.speed;
		}else if(this.dir == LEFT){
			this.x -= this.speed;
		}
		
		this.isHit();
	};
	

	this.isHit = function(){
		if(this.isDestroyed){
			return;
		}
		
		if(this.dir == LEFT){
			if(this.x <= SCREEN_OFFSETX){
				this.x = SCREEN_OFFSETX;
				this.hit = true;
			}
		}else if(this.dir == RIGHT){
			if(this.x >= SCREEN_WIDTH - this.size){
				this.x =  SCREEN_WIDTH - this.size;
				this.hit = true;
			}
		}else if(this.dir == UP ){
			if(this.y <= SCREEN_OFFSETY){
				this.y = SCREEN_OFFSETY;
				this.hit = true;
			}
		}else if(this.dir == DOWN){
			if(this.y >= SCREEN_HEIGHT - this.size){
				this.y = SCREEN_HEIGHT - this.size;
				this.hit = true;
			}
		}
		
		if(!this.hit){
			if(bulletArray != null && bulletArray.length > 0){
				for(var i=0;i<bulletArray.length;i++){
					if(bulletArray[i] != this && this.owner.isAI != bulletArray[i].owner.isAI && bulletArray[i].hit == false && CheckIntersect(bulletArray[i],this,0)){
						this.hit = true;
						bulletArray[i].hit = true;
						break;
					}
				}
			}
		}
		
		if(!this.hit){

			if(this.type == BULLET_TYPE_PLAYER){
				if(enemyArray != null || enemyArray.length > 0){
					for(var i=0;i<enemyArray.length;i++){
						var enemyObj = enemyArray[i];
						if(!enemyObj.isDestroyed && CheckIntersect(this,enemyObj,0)){
							CheckIntersect(this,enemyObj,0);
							if(enemyObj.lives > 1){
								enemyObj.lives --;
							}else{
								enemyObj.distroy();
							}
							this.hit = true;
							break;
						}
					}
				}
			}else if(this.type == BULLET_TYPE_ENEMY){
				if(player1.lives > 0 && CheckIntersect(this,player1,0)){
					if( !player1.isDestroyed){
						player1.distroy();
					}
					this.hit = true;
				}else if(player2.lives > 0 && CheckIntersect(this,player2,0)){
					if( !player2.isDestroyed){
						player2.distroy();
					}
					this.hit = true;
				}
			}
		}
		
		
		if(this.hit){
			this.distroy();
		}
	};
	

	this.distroy = function(){
		this.isDestroyed = true;
		crackArray.push(new CrackAnimation(CRACK_TYPE_BULLET,this.ctx,this));
		if(!this.owner.isAI){
			BULLET_DESTROY_AUDIO.play();
		}
	};
	
	
};

function CheckIntersect(object1, object2, overlap)
{

	A1 = object1.x + overlap;
	B1 = object1.x + object1.size - overlap;
	C1 = object1.y + overlap;
	D1 = object1.y + object1.size - overlap;
 
	A2 = object2.x + overlap;
	B2 = object2.x + object2.size - overlap;
	C2 = object2.y + overlap;
	D2 = object2.y + object2.size - overlap;
 
	
	if(A1 >= A2 && A1 <= B2
	   || B1 >= A2 && B1 <= B2)
	{
		
		if(C1 >= C2 && C1 <= D2 || D1 >= C2 && D1 <= D2)
		{
			return true;
		}
	}
	return false;
}