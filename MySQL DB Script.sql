drop database none_bot;
create database none_bot;
use none_bot;

#Create a new user compatible with Node.js
#CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
#ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
#GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';

create table guilds(
	ID_GUILD		bigint			not null	primary key,
	GUILD_NAME		varchar(500)	not null
)engine=InnoDB;

create table channels(
	ID_CHANN		bigint			not null	primary key,
    ID_GUILD		bigint			not null,
    CHANN_NAME		varchar(500)	not null,
    foreign key (ID_GUILD)
	references guilds(ID_GUILD)
)engine=InnoDB;

#Search a channel
DELIMITER $$
CREATE PROCEDURE `get_available_channel`(
	in ID_GUILD bigint,
	in ID_CHANN bigint
)
BEGIN
	set @found_guild = (
		select
			guilds.ID_GUILD
			
		from guilds

		where
			guilds.ID_GUILD = ID_GUILD
			
		limit 1
    );
    
    if (@found_guild is null) then
		select true as value;
        
	else
		set @found_chann = (
			select
				channels.ID_CHANN
                
			from channels
            
            where 
					channels.ID_GUILD = ID_GUILD
				and	channels.ID_CHANN = ID_CHANN
                
			limit 1
        );
        
        if (@found_chann is null) then
			select false as value;
		else
			select true as value;
        end if;
    end if;
END;$$
DELIMITER ;

#Add an exclusive channel
DELIMITER $$
CREATE PROCEDURE `set_available_channel`(
	in ID_GUILD 	bigint,
    in GUILD_NAME	varchar(500),
    in ID_CHANN		bigint,
    in CHANN_NAME	varchar(500)
)
BEGIN
	set @cant_guild = (
		select distinct
			count(guilds.ID_GUILD)
            
		from guilds
        
        where
			guilds.ID_GUILD = ID_GUILD
    );
	set @cant_chann = (
		select distinct
			count(channels.ID_CHANN)
            
		from channels
        
        where
			channels.ID_CHANN = ID_CHANN
    );

	if (@cant_guild = 0) then
    	insert into guilds(
			ID_GUILD,
			GUILD_NAME
		) values(
			ID_GUILD,
			GUILD_NAME
		);
    end if;
    
    if (@cant_chann = 0) then
		insert into channels(
            ID_CHANN,
			ID_GUILD,
            CHANN_NAME
        ) values(
            ID_CHANN,
			ID_GUILD,
            CHANN_NAME
        );
        
        select 1 as value;
	else
        select 0 as value;
    end if;
END;$$
DELIMITER ;

#Delete a channel
DELIMITER $$
CREATE PROCEDURE `del_available_channel`(
	in ID_CHANN bigint
)
BEGIN
	set @id_guild = (
		select
			channels.ID_GUILD
            
		from channels
        
        where
			channels.ID_CHANN = ID_CHANN
            
		limit 1
    );

	#delete channel
    delete from channels 
    where 
			channels.ID_GUILD = @id_guild
		and	channels.ID_CHANN = ID_CHANN;
        
	#delete guild
	set @cant = (
		select
			count(channels.ID_CHANN) as cant
            
		from channels
        
        where
			channels.ID_GUILD = @id_guild
    );
    if (@cant = 0) then
		delete from guilds
        where
			guild.ID_GUILD = @id_guild;
    end if;
    
END;$$
DELIMITER ;

#Delete all channels
DELIMITER $$
CREATE PROCEDURE `del_all_channels`(
	in ID_GUILD bigint
)
BEGIN
	delete from channels
	where
		channels.ID_GUILD = ID_GUILD;
	
    delete from guilds
    where
		guilds.ID_GUILD = ID_GUILD;
    
END;$$
DELIMITER ;
