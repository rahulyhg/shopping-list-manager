<?php

/**
 *  Mysqli Database Wrapper 
 */
class Connection {
    private $mysqli;
    private $stmt;

    /**
     * Constructor :)
     * 
     * @param mysqli $db initiated Mysqli database instance (new Mysqli(..))
     */
    public function __construct($mysqli) {
        $this->mysqli = $mysqli;
    }

    /**
     * Execute simple SQL Query 
     * or optional prepared query ($types for types and $vars for bind_param vars)
     * 
     * @param string $sql Query
     * @param string $types (optional) for bind_param types (ex. "iii")
     * @param array $vars (optional) for bind_param variables we bounded
     * @return $this
     */
    public function query(string $sql, string $types = '', Array $vars = []) : self {
        if($vars) {
            $stmt = $this->mysqli->prepare($sql);
            $stmt->bind_param($types, ...$vars);
            $stmt->execute();
            $this->stmt = $stmt->get_result();
        } else {
            $this->stmt = $this->mysqli->query($sql);
        }

        return $this;
    }

    /**
     * Fetch all results
     * 
     * @return array all results
     */
    public function fetchAll() : Array {
        $response = Array();

        while ($row = $this->stmt->fetch_assoc()) {
            $response[] = $row;
        }

        return $response;
    }

    /**
     * Fetch single result
     * 
     * @return string result
     */
    public function fetchSingle() {
        $response = '';

        while ($row = $this->stmt->fetch_assoc()) {
            $response = $row;
        }

        return $response;
    }

    /**
     * Helper methods
     */
    public function closePreparedStmt() {
        $this->stmt->close();
    }

    public function closeConnection() {
        $this->mysqli->close();
    }

    public function getLastInsertedId() : string {
        return $this->mysqli->insert_id;
    }
}